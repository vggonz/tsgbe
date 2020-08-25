import { Memory } from "./memory";
import { Registers } from "./registers";
import { Constants } from "../util/constants";
import { GPU } from "./gpu";
import { OPCODES, OPCODES_CB, Instruction } from "./instructions";

export class CPU {

    // Array con el numero de ciclos transcurridos desde cada ultima interrupcion
    private cycles: number[];

    // Memoria principal
    private memory: Memory;
    // Registros internos de la CPU
    private registers: Registers;
    // Sistema de gestion grafica
    private graphics: GPU;

    constructor(memory: Memory, graphics: GPU) {
        this.memory = memory;
        this.registers = new Registers();
        this.graphics = graphics;
        this.cycles = new Array<number>(3);
        this.reset();
    }

    // Asigna un valor por defecto a los registros y a ciertas direcciones de memoria
    // Equivale a un reinicio fisico de la consola
    public reset() {
        this.cycles[0] = 0;
        this.cycles[1] = 0;
        this.cycles[2] = 0;

        this.registers.reset();
        this.memory.reset();
    }

    public run(): number {
        // Ciclo principal: procesa instruccion, activa las interrupciones adecuadas simulando
        // el hardware, y finalmente ejecuta las rutinas de tratamiento de interrupciones
        const ticks = this.processInstruction();
        this.checkInterruptions();
        this.fireInterruptions();
        return ticks;
    }

    // Activa las interrupciones adecuadas y simula su funcionamiento por hardware
    private fireInterruptions() {
        // Interrupcion TIMER
        if ((this.memory.read(Constants.TIMER_CRTL) & 0x04) != 0) {
            let timerMax: number = 0;
            // Velocidad del temporizador
            switch (this.memory.read(Constants.TIMER_CRTL) & 0x03) {
                case 0: timerMax = Constants.CYCLES_TIMER_MODE0; break;
                case 1: timerMax = Constants.CYCLES_TIMER_MODE1; break;
                case 2: timerMax = Constants.CYCLES_TIMER_MODE2; break;
                case 3: timerMax = Constants.CYCLES_TIMER_MODE3; break;
            }
            if (this.cycles[1] > timerMax) {
                this.cycles[1] = 0;
                this.memory.write(this.memory.read(Constants.TIMER_COUNT) + 1, Constants.TIMER_COUNT);
                // Si desborda se activa la interrupcion y se reinicia el contador
                if (this.memory.read(Constants.TIMER_COUNT) == 0xFF) {
                    this.memory.write(this.memory.read(Constants.TIMER_RELOAD), Constants.TIMER_COUNT);
                    this.memory.write(this.memory.read(Constants.INT_FLAG) | Constants.INT_TIMER, Constants.INT_FLAG);
                }
            }
        }

        // Registro DIV
        if (this.cycles[0] > Constants.CYCLES_DIV) {
            this.memory.write(this.memory.read(Constants.DIV_CNTR) + 1, Constants.DIV_CNTR);
            this.cycles[0] = 0;
        }

        // Interrupcion LCDC
        if (this.cycles[2] > Constants.CYCLES_LCD_MODE1) {
            this.cycles[2] = 0;
            // Aumento de linea de dibujo
            if (this.memory.read(Constants.LCD_Y_LOC) == 0x99) this.memory.write(0, Constants.LCD_Y_LOC);
            else this.memory.write(this.memory.read(Constants.LCD_Y_LOC) + 1, Constants.LCD_Y_LOC);

            // Comparacion de linea
            if (this.memory.read(Constants.LCD_Y_LOC) == this.memory.read(Constants.LCD_Y_COMP)) {
                this.memory.write(this.memory.read(Constants.LCD_STAT) | 0x04, Constants.LCD_STAT);
                if ((this.memory.read(Constants.LCD_STAT) & 0x40) > 0) this.memory.write(this.memory.read(Constants.INT_FLAG) | Constants.INT_LCDC, Constants.INT_FLAG);
            } else { 
                this.memory.write(this.memory.read(Constants.LCD_STAT) & 0xFB, Constants.LCD_STAT);
            }
        }
        if (this.memory.read(Constants.LCD_Y_LOC) < 144) {
            // Modo 10 (Cuando se esta accediendo entre 0xFE00 y 0xFE9F)
            if (this.cycles[2] < Constants.CYCLES_LCD_MODE2 && (this.memory.read(Constants.LCD_STAT) & 0x03) != 0x02) {
                this.memory.write((this.memory.read(Constants.LCD_STAT) & 0xFC) | 0x02, Constants.LCD_STAT);
                if ((this.memory.read(Constants.LCD_STAT) & 0x20) > 0) this.memory.write(this.memory.read(Constants.INT_FLAG) | Constants.INT_LCDC, Constants.INT_FLAG);
                // Modo 11 
            } else if (this.cycles[2] >= Constants.CYCLES_LCD_MODE2 && this.cycles[2] < Constants.CYCLES_LCD_MODE3 && (this.memory.read(Constants.LCD_STAT) & 0x03) != 0x03) {
                // Se dibujan las primeras 144 lineas cuando se ha dejado de escribir en la zona grafica de memoria
                this.graphics.hblank();
                this.memory.write((this.memory.read(Constants.LCD_STAT) & 0xFC) | 0x03, Constants.LCD_STAT);
                // Modo 00 (Durante el HBLANK, la CPU puede acceder a la display RAM entre 0x8000 y 0x9FFF)
            } else if (this.cycles[2] >= Constants.CYCLES_LCD_MODE3 && (this.memory.read(Constants.LCD_STAT) & 0x03) != 0) {
                this.memory.write(this.memory.read(Constants.LCD_STAT) & 0xFC, Constants.LCD_STAT);
                if ((this.memory.read(Constants.LCD_STAT) & 0x08) > 0) this.memory.write(this.memory.read(Constants.INT_FLAG) | Constants.INT_LCDC, Constants.INT_FLAG);
            }
            // Modo 01 (Periodo VBLANK, la CPU puede acceder a la display RAM entre 0x8000 y 0x9FFF)
        } else if ((this.memory.read(Constants.LCD_Y_LOC) >= 144) && (this.memory.read(Constants.LCD_STAT) & 0x03) != 0x01) {
            // Refresco vertical
            this.graphics.vblank();
            this.memory.write((this.memory.read(Constants.LCD_STAT) & 0xFC) | 0x01, Constants.LCD_STAT);
            if ((this.memory.read(Constants.LCD_STAT) & 0x10) > 0) this.memory.write(this.memory.read(Constants.INT_FLAG) | Constants.INT_LCDC, Constants.INT_FLAG);
            this.memory.write(this.memory.read(Constants.INT_FLAG) | Constants.INT_VBLANK, Constants.INT_FLAG);
        }

    }

    // Inicia las rutinas de tratamiento de cada una de las interrupciones que esten activas
    private checkInterruptions() {
        if (this.registers.flagIME == true) {
            this.callInterruption(Constants.INT_VBLANK, 0x40) ||
                this.callInterruption(Constants.INT_LCDC, 0x48) ||
                this.callInterruption(Constants.INT_TIMER, 0x50) ||
                this.callInterruption(Constants.INT_SERIALTX, 0x58) ||
                this.callInterruption(Constants.INT_KEY, 0x60);
        }
    }

    private callInterruption(interruption: number, direction: number) {
        if ((this.memory.read(Constants.INT_FLAG) & interruption) > 0 && (this.memory.read(Constants.INT_ENABLE) & interruption) > 0) {
            this.memory.write(this.memory.read(Constants.INT_FLAG) & ~interruption, Constants.INT_FLAG);

            this.registers.SP--;
            this.memory.write((this.registers.PC & 0xFF00) >> 8, this.registers.SP);
            this.registers.SP--;
            this.memory.write(this.registers.PC & 0x00FF, this.registers.SP);

            this.registers.PC = direction;
            return true;
        }
        return false;
    }

    // Ejecuta una instruccion del contador de programa
    private processInstruction() {
        const opCod = this.memory.read(this.registers.PC);
        let instruction: Instruction;
        if (opCod == 0xCB) {
            this.registers.PC++;
            instruction = OPCODES_CB[this.memory.read(this.registers.PC)]
        } else {
            instruction = OPCODES[opCod];
        }

        if (!instruction) {
            throw new Error(`[ERROR] Invalid opcode 0x${opCod.toString(16).toUpperCase()}`);
        }

        // Ejecuta la instruccion y recoge su duracion teorica
        const ticks = instruction(this.registers, this.memory);

        // Aumenta los contadores de ciclos para las interrupciones
        for (let i = 0; i < this.cycles.length; i++) this.cycles[i] += ticks;
        return ticks;
    }

}