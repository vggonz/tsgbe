import { Cartridge } from '../peripherals/cartridge';
import { Constants } from '../util/constants';
import { Keypad } from '../peripherals/keypad';

export class Memory {

    // Array con toda la memoria principal
    public ram: Uint8Array;
    // Cartucho cargado
    private cartridge: Cartridge;
    private keypad: Keypad;

    constructor(cartridge: Cartridge, keypad: Keypad) {
        this.ram = new Uint8Array(Constants.MEMSIZE);
        this.cartridge = cartridge;
        this.keypad = keypad;
    }

    // Lee una posicion de memoria
    public read(direction: number): number {
        let value: number = 0;

        direction &= 0xFFFF;
        // 0-0x8000: ROM del cartucho
        if (direction >= 0 && direction < 0x8000) value = this.cartridge.read(direction);
        // 0xA000-0xC000: RAM del cartucho
        else if (direction >= 0xA000 && direction < 0xC000) value = this.cartridge.read(direction);
        else value = this.ram[direction];
        return value & 0xFF;
    }

    public readWord(direction: number): number {
        return ((this.read(direction + 2) << 8) | this.read(direction + 1)) & 0xFFFF;
    }

    // Escribe un valor en una direccion de memoria
    // Esta funcion solo debe ser accedida por las instrucciones, el resto de objetos como
    // perifericos de pantalla o teclado deberan acceder directamente a la memoria sin pasar
    // por estas funciones porque podrian producir un bucle infinito
    public write(value: number, direction: number) {
        direction &= 0xFFFF;
        value &= 0xFF;
        // 0-0x8000: ROM del cartucho
        if (direction >= 0 && direction < 0x8000) this.cartridge.write(value, direction);
        // 0xA000-0xC000: RAM del cartucho
        else if (direction >= 0xA000 && direction < 0xC000) this.cartridge.write(value, direction);
        // Echo Memory??
        else if (direction >= 0xC000 && direction < 0xE000) this.ram[direction] = value;
        // 0xFF00-0xFFFF: Registros de IO
        else if (direction >= 0xFF00) this.writeIO(value, direction);
        else this.ram[direction] = value;
    }

    // Escribe y realiza un tratamiento especial en las direccion de entrada / salida
    private writeIO(value: number, direction: number) {
        switch (direction) {
            // Actualiza la pulsacion de las teclas en cuanto recibe la solicitud
            case Constants.JOYPAD: 
                this.ram[Constants.JOYPAD] = value; 
                this.writeKeypad(); 
                break;
            // Transferencia DMA de 160 bytes a partir de la direccion dada a 0xFE00
            case Constants.LCD_DMA: 
                this.ram[Constants.LCD_DMA] = value; 
                const origin = this.ram[Constants.LCD_DMA] << 8;
                this.ram.copyWithin(0xFE00, origin, origin + 0xA0); 
                break;
            // Reset del control de DIV
            case Constants.DIV_CNTR: this.ram[Constants.DIV_CNTR] = 0x00; break;
            default: this.ram[direction] = value; break;
        }
    }

    // Actualiza la direccion de memoria adecuada segun la matriz de teclas solicitada con el estado
    // actual de las teclas
    private writeKeypad() {
        let joypad: number = this.ram[Constants.JOYPAD];
        joypad &= 0xF0;
        // Segun la peticion, se actualiza la memoria con las teclas apropiadas
        const keys = this.keypad.keys;
        switch (joypad) {
            case 0x30: joypad = 0x3F; break;
            case 0x20:
                if (!keys[0]) joypad |= 0x08; // Down
                if (!keys[1]) joypad |= 0x04; // Up
                if (!keys[2]) joypad |= 0x02; // Left
                if (!keys[3]) joypad |= 0x01; // Right
                break;
            case 0x10:
                if (!keys[4]) joypad |= 0x08; // Start
                if (!keys[5]) joypad |= 0x04; // Select
                if (!keys[6]) joypad |= 0x02; // B
                if (!keys[7]) joypad |= 0x01; // A
                break;
        }
        // Accede directamente al array de la memoria para evitar bucles infinitos con las funciones de gestion
        // del acceso a memoria
        this.ram[Constants.JOYPAD] = joypad;
    }

    public reset() {
        // Valor inicial de algunas direcciones de memoria
        this.write(0xCF, Constants.JOYPAD);
        this.write(0x00, Constants.SERIAL_DATA);
        this.write(0x7E, Constants.SERIAL_CTRL);
        this.write(0xFF, 0xFF03);
        this.write(0xAF, Constants.DIV_CNTR);
        this.write(0x00, Constants.TIMER_COUNT);
        this.write(0x00, Constants.TIMER_RELOAD);
        this.write(0xF8, Constants.TIMER_CRTL);
        this.write(0x00, Constants.INT_FLAG);

        this.write(0x80, Constants.SND_1_ENT);
        this.write(0xBF, Constants.SND_1_WAV_LEN);
        this.write(0xF3, Constants.SND_1_ENV);
        this.write(0xFF, Constants.SND_1_FREQ_KICK_LOWER);
        this.write(0xBF, Constants.SND_1_FREQ_KICK_UPPER);
        this.write(0xFF, 0xFF15);
        this.write(0x3F, Constants.SND_2_WAVE_LEN);
        this.write(0x00, Constants.SND_2_ENV);
        this.write(0xFF, Constants.SND_2_FREQ_KICK_LOWER);
        this.write(0xBF, Constants.SND_2_FREQ_KICK_UPPER);
        this.write(0x7F, Constants.SND_3_ON_OFF);
        this.write(0xFF, Constants.SND_3_LEN);
        this.write(0x9F, Constants.SND_3_VOLUME);
        this.write(0xFF, Constants.SND_3_FREQ_KICK_LOWER);
        this.write(0xBF, Constants.SND_3_FREQ_KICK_UPPER);
        this.write(0xFF, 0xFF1E);
        this.write(0xFF, 0xFF1F);
        this.write(0xFF, Constants.SND_4_LEN);
        this.write(0x00, Constants.SND_4_ENV);
        this.write(0x00, Constants.SND_4_POLY_KICK_LOWER);
        this.write(0xBF, Constants.SND_4_POLY_KICK_UPPER);
        this.write(0x77, Constants.SND_VOICE_INP);
        this.write(0xF3, Constants.SND_STEREO);
        this.write(0xF1, Constants.SND_STAT);
        this.write(0x06, Constants.SND_BNK_10);
        this.write(0xFE, Constants.SND_BNK_11);
        this.write(0x0E, Constants.SND_BNK_12);
        this.write(0x7F, Constants.SND_BNK_13);
        this.write(0x00, Constants.SND_BNK_14);
        this.write(0xFF, Constants.SND_BNK_15);
        this.write(0x58, Constants.SND_BNK_16);
        this.write(0xDF, Constants.SND_BNK_17);
        this.write(0x00, Constants.SND_BNK_20);
        this.write(0xEC, Constants.SND_BNK_21);
        this.write(0x00, Constants.SND_BNK_22);
        this.write(0xBF, Constants.SND_BNK_23);
        this.write(0x0C, Constants.SND_BNK_24);
        this.write(0xED, Constants.SND_BNK_25);
        this.write(0x03, Constants.SND_BNK_26);
        this.write(0xF7, Constants.SND_BNK_27);

        this.write(0x91, Constants.LCD_CTRL);
        this.write(0x85, Constants.LCD_STAT);
        this.write(0x00, Constants.LCD_SCROLL_Y);
        this.write(0x00, Constants.LCD_SCROLL_X);
        this.write(0x00, Constants.LCD_Y_LOC);
        this.write(0x00, Constants.LCD_Y_COMP);
        this.write(0x00, Constants.LCD_DMA);
        this.write(0xFC, Constants.LCD_BACK_PALETTE);
        this.write(0xFF, Constants.LCD_SPR0_PALETTE);
        this.write(0xFF, Constants.LCD_SPR1_PALETTE);
        this.write(0x00, Constants.LCD_WIN_Y);
        this.write(0x00, Constants.LCD_WIN_X);
        this.write(0x7E, Constants.CPU_SPEED_REG);
        this.write(0xFF, 0xFF4E);
        this.write(0xFE, Constants.VRAM_BANK);

        this.write(0xFF, 0xFF50);
        this.write(0x00, Constants.DMA_SRC_UPPER);
        this.write(0x00, Constants.DMA_SRC_LOWER);
        this.write(0x00, Constants.DMA_DST_UPPER);
        this.write(0x00, Constants.DMA_DST_LOWER);
        this.write(0xFF, Constants.DMA_LEN_TYPE);
        this.write(0x00, Constants.IR_PORT);
        this.write(0xC0, Constants.BGP_INDEX);
        this.write(0x00, Constants.BGP_DATA);
        this.write(0xC1, Constants.OBP_INDEX);
        this.write(0x00, Constants.OBP_DATA);

        this.write(0xF8, Constants.RAM_BANK);

        this.write(0x00, Constants.INT_ENABLE);
    }
}
