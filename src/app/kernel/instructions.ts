import { Registers } from './registers';
import { Memory } from './memory';
import { Constants } from '../util/constants';

export type Instruction = (registers: Registers, memory: Memory) => number;

export interface InstructionSet {
    [index: number]: Instruction;
}

const OPS = {
    NOP: function (registers: Registers) { registers.PC += 1; return 4; },
    LD: {
        LD_DD_NN: function (registers: Registers, memory: Memory, reg: string) {
            registers.setReg(reg, memory.readWord(registers.PC));
            registers.PC += 3;
            return 12;
        },
        LD_R_R: function (registers: Registers, destiny: string, origin: string) {
            registers.setReg(destiny, registers.getReg(origin));
            registers.PC += 1;
            return 4;
        },
        LD_R_N: function (registers: Registers, memory: Memory, destiny: string) {
            registers.setReg(destiny, memory.read(registers.PC + 1));
            registers.PC += 2;
            return 8;
        },
        LD_ADR_R: function (registers: Registers, memory: Memory, origin: string) {
            memory.write(registers.getReg(origin), memory.readWord(registers.PC));
            registers.PC += 3;
            return 12;
        },
        LD_ADR_RR: function (registers: Registers, memory: Memory, origin: string) {
            const value: number = registers.getReg(origin);
            const direction: number = memory.readWord(registers.PC);
            memory.write(value & 0xFF, direction);
            memory.write((value >> 8) & 0xFF, direction + 1);
            registers.PC += 3;
            return 20;
        },
        LDD_RADR_R: function (registers: Registers, memory: Memory, destiny: string, origin: string) {
            let direction = registers.getReg(destiny);
            memory.write(registers.getReg(origin), direction);
            direction = direction == 0x00 ? 0xFFFF : direction - 1;
            registers.setReg(destiny, direction);
            registers.PC += 1;
            return 8;
        },
        LDI_RADR_R: function (registers: Registers, memory: Memory, destiny: string, origin: string) {
            let direction = registers.getReg(destiny);
            memory.write(registers.getReg(origin), direction);
            direction = direction == 0x00 ? 0xFFFF : direction + 1;
            registers.setReg(destiny, direction);
            registers.PC += 1;
            return 8;
        },
        LDD_R_RADR: function (registers: Registers, memory: Memory, destiny: string, origin: string) {
            let direction = registers.getReg(origin);
            const value = memory.read(direction);
            registers.setReg(destiny, value);
            direction = direction == 0x00 ? 0xFFFF : direction - 1;
            registers.setReg(origin, direction);
            registers.PC += 1;
            return 8;
        },
        LDI_R_RADR: function (registers: Registers, memory: Memory, destiny: string, origin: string) {
            let direction = registers.getReg(origin);
            const value = memory.read(direction);
            registers.setReg(destiny, value);
            direction = direction == 0x00 ? 0xFFFF : direction + 1;
            registers.setReg(origin, direction);
            registers.PC += 1;
            return 8;
        },
        LD_R_DADR: function (registers: Registers, memory: Memory, destiny: string) {
            registers.setReg(destiny, memory.read(0xFF00 + memory.read(registers.PC + 1)));
            registers.PC += 2
            return 12;
        },
        LD_R_DR: function (registers: Registers, memory: Memory, destiny: string, origin: string) {
            registers.setReg(destiny, memory.read(0xFF00 + registers.getReg(origin)));
            registers.PC += 1;
            return 8;
        },
        LD_DADR_R: function (registers: Registers, memory: Memory, origin: string) {
            memory.write(registers.getReg(origin), 0xFF00 + memory.read(registers.PC + 1));
            registers.PC += 2;
            return 12;
        },
        LD_DR_R: function (registers: Registers, memory: Memory, destiny: string, origin: string) {
            memory.write(registers.getReg(origin), 0xFF00 + registers.getReg(destiny));
            registers.PC += 1;
            return 8;
        },
        LD_RADR_R: function (registers: Registers, memory: Memory, destiny: string, origin: string) {
            memory.write(registers.getReg(origin), registers.getReg(destiny));
            registers.PC += 1;
            return 8;
        },
        LD_R_ADR: function (registers: Registers, memory: Memory, destiny: string) {
            registers.setReg(destiny, memory.read(memory.readWord(registers.PC)));
            registers.PC += 3;
            return 16;
        },
        LD_R_RADR: function (registers: Registers, memory: Memory, destiny: string, origin: string) {
            registers.setReg(destiny, memory.read(registers.getReg(origin)));
            registers.PC += 1;
            return 12;
        },
        LD_RADR_N: function (registers: Registers, memory: Memory, destiny: string) {
            memory.write(memory.read(registers.PC + 1), registers.getReg(destiny));
            registers.PC += 2;
            return 12;
        },
        LD_R_SPD: function (registers: Registers, memory: Memory, destiny: string) {
            let offset = memory.read(registers.PC + 1);
            if (offset > 127) offset -= 256;
            registers.setReg(destiny, registers.SP + offset);
            registers.setFlags(0);
            registers.flagH = ((registers.SP & 0x0F) + (offset & 0x0F)) > 0x0F;
            registers.flagC = (registers.getReg(destiny) & 0xFF) < (registers.SP & 0xFF);
            registers.PC += 2;
            return 12;
        }
    },
    INT: {
        DI: function (registers: Registers) {
            registers.flagIME = false;
            registers.PC += 1;
            return 4;
        },
        EI: function (registers: Registers) {
            registers.flagIME = true;
            registers.PC += 1;
            return 4;
        },
        HALT: function (registers: Registers, memory: Memory) {
            if (registers.flagIME && (memory.read(Constants.INT_FLAG) & memory.read(Constants.INT_ENABLE)) > 0) {
                registers.PC += 1;
            }
            return 4;
        },
        STOP: function (registers: Registers) {
            registers.PC += 2;
            return 4;
        }
    },
    BIT: {
        BIT_R: function (registers: Registers, mask: number, reg: string) {
            registers.flagZ = (mask & registers.getReg(reg)) == 0;
            registers.flagH = true;
            registers.flagN = false;
            registers.PC += 1;
            return 8;
        },
        BIT_RADR: function (registers: Registers, memory: Memory, mask: number, reg: string) {
            registers.flagZ = (mask & memory.read(registers.getReg(reg))) == 0;
            registers.flagH = true;
            registers.flagN = false;
            registers.PC += 1;
            return 12;
        },
        SET_R: function (registers: Registers, mask: number, reg: string) {
            registers.setReg(reg, registers.getReg(reg) | mask);
            registers.PC += 1;
            return 8;
        },
        SET_RADR: function (registers: Registers, memory: Memory, mask: number, reg: string) {
            const direction = registers.getReg(reg);
            memory.write(memory.read(direction) | mask, direction);
            registers.PC += 1;
            return 16;
        },
        RES_R: function (registers: Registers, mask: number, reg: string) {
            registers.setReg(reg, registers.getReg(reg) & ~mask);
            registers.PC += 1;
            return 8;
        },
        RES_RADR: function (registers: Registers, memory: Memory, mask: number, reg: string) {
            const direction = registers.getReg(reg);
            memory.write(memory.read(direction) & ~mask, direction);
            registers.PC += 1;
            return 16;
        },
        SWAP_R: function (registers: Registers, reg: string) {
            let value = registers.getReg(reg);
            value = (((value & 0x0F) << 4) | ((value & 0xF0) >> 4));
            registers.setReg(reg, value);
            registers.setFlags(0);
            registers.flagZ = value == 0;
            registers.PC += 1;
            return 8;
        },
        SWAP_RADR: function (registers: Registers, memory: Memory, reg: string) {
            const direction = registers.getReg(reg);
            let value = memory.read(direction);
            value = (((value & 0x0F) << 4) | ((value & 0xF0) >> 4));
            memory.write(value, direction);
            registers.setFlags(0);
            registers.flagZ = value == 0;
            registers.PC += 1;
            return 16;
        }
    },
    COMP: {
        CCF: function (registers: Registers) {
            registers.flagN = false;
            registers.flagH = false;
            registers.flagC = !registers.flagC;
            registers.PC += 1;
            return 4;
        },
        CPL: function (registers: Registers) {
            registers.flagN = true;
            registers.flagH = true;
            registers.A ^= 0xFF;
            registers.A &= 0xFF;
            registers.PC += 1;
            return 4;
        },
        SCF: function (registers: Registers) {
            registers.flagH = false;
            registers.flagN = false;
            registers.flagC = true;
            registers.PC += 1;
            return 4;
        }
    },
    LOGIC: {
        XOR_R: function (registers: Registers, reg: string) {
            registers.A ^= registers.getReg(reg);
            registers.A &= 0xFF;
            registers.setFlags(0);
            registers.flagZ = registers.A == 0;
            registers.PC += 1;
            return 4;
        },
        XOR_RADR: function (registers: Registers, memory: Memory, reg: string) {
            registers.A ^= memory.read(registers.getReg(reg));
            registers.A &= 0xFF;
            registers.setFlags(0);
            registers.flagZ = registers.A == 0;
            registers.PC += 1;
            return 8;
        },
        XOR_N: function (registers: Registers, memory: Memory,) {
            registers.A ^= memory.read(registers.PC + 1);
            registers.A &= 0xFF;
            registers.setFlags(0);
            registers.flagZ = registers.A == 0;
            registers.PC += 2;
            return 8;
        },
        OR_R_R: function (registers: Registers, reg: string) {
            registers.A |= registers.getReg(reg);
            registers.setFlags(0);
            registers.flagZ = registers.A == 0;
            registers.PC += 1;
            return 4;
        },
        AND_R_R: function (registers: Registers, reg: string) {
            registers.A &= registers.getReg(reg);
            registers.flagH = true;
            registers.flagN = false;
            registers.flagC = false;
            registers.flagZ = registers.A == 0;
            registers.PC += 1;
            return 4;
        },
        AND_R_N: function (registers: Registers, memory: Memory) {
            registers.A &= memory.read(registers.PC + 1);
            registers.flagH = true;
            registers.flagN = false;
            registers.flagC = false;
            registers.flagZ = registers.A == 0;
            registers.PC += 2;
            return 8;
        },
        AND_RADR: function (registers: Registers, memory: Memory, reg: string) {
            registers.A &= memory.read(registers.getReg(reg));
            registers.flagH = true;
            registers.flagN = false;
            registers.flagC = false;
            registers.flagZ = registers.A == 0;
            registers.PC += 1;
            return 8;
        },
        OR_R_ADR: function (registers: Registers, memory: Memory, reg: string) {
            registers.A |= memory.read(registers.getReg(reg));
            registers.setFlags(0);
            registers.flagZ = registers.A == 0;
            registers.PC += 1;
            return 8;
        },
        OR_N: function (registers: Registers, memory: Memory) {
            registers.A |= memory.read(registers.PC + 1);
            registers.setFlags(0);
            registers.flagZ = registers.A == 0;
            registers.PC += 2;
            return 8;
        }
    },
    SHIFT: {
        RLC: function (registers: Registers, reg: string, zero: boolean) {
            const value = registers.getReg(reg);
            const carry = (value & (0x01 << 7)) >> 7;
            registers.flagC = (value & 0x80) != 0;
            registers.flagZ = zero ? (value & 0xFF) == 0 : false;
            registers.flagN = false;
            registers.flagH = false;
            registers.setReg(reg, ((value << 1) | carry) & 0xFF);
            registers.PC += 1;
            return zero ? 8 : 4;
        },
        RLC_RADR: function (registers: Registers, memory: Memory, reg: string) {
            const direction = registers.getReg(reg);
            const value = memory.read(direction);
            const carry = (value & (0x01 << 7)) >> 7;
            registers.flagC = (value & 0x80) != 0;
            registers.flagZ = (value & 0xFF) == 0;
            registers.flagN = false;
            registers.flagH = false;
            memory.write(((value << 1) | carry) & 0xFF, direction);
            registers.PC += 1;
            return 16;
        },
        SLA: function (registers: Registers, reg: string) {
            const value = registers.getReg(reg) << 1;
            registers.flagC = value > 0xFF;
            registers.flagZ = (value & 0xFF) == 0;
            registers.flagN = false;
            registers.flagH = false;
            registers.setReg(reg, value & 0xFF);
            registers.PC += 1;
            return 8;
        },
        SLA_RADR: function (registers: Registers, memory: Memory, reg: string) {
            const direction = registers.getReg(reg);
            const value = memory.read(direction) << 1;
            registers.flagC = value > 0xFF;
            registers.flagZ = (value & 0xFF) == 0;
            registers.flagN = false;
            registers.flagH = false;
            memory.write(value & 0xFF, direction);
            registers.PC += 1;
            return 16;
        },
        SRA: function (registers: Registers, reg: string) {
            const value = registers.getReg(reg);
            const result = ((value >> 1) | (value & 0x80)) & 0xFF;
            registers.flagC = (value & 0x01) == 0x01;
            registers.flagZ = result == 0;
            registers.flagN = false;
            registers.flagH = false;
            registers.setReg(reg, result);
            registers.PC += 1;
            return 8;
        },
        SRA_RADR: function (registers: Registers, memory: Memory, reg: string) {
            const direction = registers.getReg(reg);
            const value = memory.read(direction)
            const result = ((value >> 1) | (value & 0x80)) & 0xFF;
            registers.flagC = (value & 0x01) == 0x01;
            registers.flagZ = result == 0;
            registers.flagN = false;
            registers.flagH = false;
            memory.write(result, direction);
            registers.PC += 1;
            return 16;
        },
        SRL: function (registers: Registers, reg: string) {
            const value = registers.getReg(reg);
            const result = (value >> 1) & 0xFF;
            registers.flagC = (value & 0x01) == 0x01;
            registers.flagZ = result == 0;
            registers.flagN = false;
            registers.flagH = false;
            registers.setReg(reg, result);
            registers.PC += 1;
            return 8;
        },
        SRL_RADR: function (registers: Registers, memory: Memory, reg: string) {
            const direction = registers.getReg(reg);
            const value = memory.read(direction)
            const result = (value >> 1) & 0xFF;
            registers.flagC = (value & 0x01) == 0x01;
            registers.flagZ = result == 0;
            registers.flagN = false;
            registers.flagH = false;
            memory.write(result, direction);
            registers.PC += 1;
            return 16;
        },
        RL: function (registers: Registers, reg: string, zero: boolean) {
            const value = (registers.getReg(reg) << 1) | (registers.flagC ? 1 : 0);
            registers.flagZ = zero ? (value & 0xFF) == 0 : false;
            registers.flagC = value > 0xFF;
            registers.flagN = false;
            registers.flagH = false;
            registers.setReg(reg, value & 0xFF);
            registers.PC += 1;
            return zero ? 8 : 4;
        },
        RL_RADR: function (registers: Registers, memory: Memory, reg: string) {
            const direction = registers.getReg(reg);
            const value = (memory.read(direction) << 1) | (registers.flagC ? 1 : 0);
            registers.flagZ = (value & 0xFF) == 0;
            registers.flagC = value > 0xFF;
            registers.flagN = false;
            registers.flagH = false;
            memory.write(value & 0xFF, direction);
            registers.PC += 1;
            return 16;
        },
        RRC: function (registers: Registers, reg: string, zero: boolean) {
            const value = registers.getReg(reg);
            const result = (value >> 1) | ((value & 0x01) << 7);
            registers.flagZ = zero ? (result & 0xFF) == 0 : false;
            registers.flagC = (value & 0x01) == 0x01;
            registers.flagH = false;
            registers.flagN = false;
            registers.setReg(reg, result & 0xFF);
            registers.PC += 1;
            return zero ? 8 : 4;
        },
        RRC_RADR: function (registers: Registers, memory: Memory, reg: string) {
            const direction = registers.getReg(reg);
            const value = memory.read(direction)
            const result = (value >> 1) | ((value & 0x01) << 7);
            registers.flagC = (value & 0x01) == 0x01;
            registers.flagZ = result == 0;
            registers.flagN = false;
            registers.flagH = false;
            memory.write(result & 0xFF, direction);
            registers.PC += 1;
            return 16;
        },
        RR: function (registers: Registers, reg: string, zero: boolean) {
            const value = registers.getReg(reg);
            const result = (value >> 1) | ((registers.flagC ? 1 : 0) << 7);
            registers.flagZ = zero ? (result & 0xFF) == 0 : false;
            registers.flagC = (value & 0x01) == 0x01;
            registers.flagH = false;
            registers.flagN = false;
            registers.setReg(reg, result & 0xFF);
            registers.PC += 1;
            return zero ? 8 : 4;
        },
        RR_RADR: function (registers: Registers, memory: Memory, reg: string) {
            const direction = registers.getReg(reg);
            const value = memory.read(direction)
            const result = (value >> 1) | ((registers.flagC ? 1 : 0) << 7);
            registers.flagC = (value & 0x01) == 0x01;
            registers.flagZ = result == 0;
            registers.flagN = false;
            registers.flagH = false;
            memory.write(result & 0xFF, direction);
            registers.PC += 1;
            return 16;
        }
    },
    JUMP: {
        JP_ADR: function (registers: Registers, memory: Memory) {
            registers.PC = memory.readWord(registers.PC);
            return 16;
        },
        JP_RADR: function (registers: Registers, reg: string) {
            registers.PC = registers.getReg(reg);
            return 4;
        },
        JP_CC0_ADR: function (registers: Registers, memory: Memory, flag: string) {
            const direction = memory.readWord(registers.PC);
            registers.PC += 3;
            if (!registers.getFlag(flag)){
              registers.PC = direction;
              return 16;
            }
            return 12;
        },
        JP_CC1_ADR: function (registers: Registers, memory: Memory, flag: string) {
            const direction = memory.readWord(registers.PC);
            registers.PC += 3;
            if (registers.getFlag(flag)){
              registers.PC = direction;
              return 16;
            }
            return 12;
        },
        JR_N: function (registers: Registers, memory: Memory) {
            let offset = memory.read(registers.PC + 1);
            if (offset > 127) offset -= 256;
            registers.PC += 2;
            registers.PC += offset;
            return 12;
        },
        JR_CC0_N: function (registers: Registers, memory: Memory, flag: string) {
            let offset = memory.read(registers.PC + 1);
            if (offset > 127) offset -= 256;
            registers.PC += 2;
            if (!registers.getFlag(flag)) {
                registers.PC += offset;
                return 12;
            }
            return 8;
        },
        JR_CC1_N: function (registers: Registers, memory: Memory, flag: string) {
            let offset = memory.read(registers.PC + 1);
            if (offset > 127) offset -= 256;
            registers.PC += 2;
            if (registers.getFlag(flag)) {
                registers.PC += offset;
                return 12;
            }
            return 8;
        },
        CALL_ADR: function (registers: Registers, memory: Memory) {
            const direction = memory.readWord(registers.PC);
            registers.PC += 3;
            registers.SP--;
            memory.write((registers.PC & 0xFF00) >> 8, registers.SP);
            registers.SP--;
            memory.write(registers.PC & 0x00FF, registers.SP);
            registers.PC = direction;
            return 24;
        },
        CALL_CC0_ADR: function (registers: Registers, memory: Memory, flag: string) {
            const direction = memory.readWord(registers.PC);
            registers.PC += 3;
            if (!registers.getFlag(flag)) {
                registers.SP--;
                memory.write((registers.PC & 0xFF00) >> 8, registers.SP);
                registers.SP--;
                memory.write(registers.PC & 0x00FF, registers.SP);
                registers.PC = direction;
                return 24;
            }
            return 12;
        },
        CALL_CC1_ADR: function (registers: Registers, memory: Memory, flag: string) {
            const direction = memory.readWord(registers.PC);
            registers.PC += 3;
            if (registers.getFlag(flag)) {
                registers.SP--;
                memory.write((registers.PC & 0xFF00) >> 8, registers.SP);
                registers.SP--;
                memory.write(registers.PC & 0x00FF, registers.SP);
                registers.PC = direction;
                return 24;
            }
            return 12;
        },
        PUSH_RR: function (registers: Registers, memory: Memory, reg: string) {
            const value = registers.getReg(reg);
            registers.SP--;
            memory.write(((value & 0xFF00) >> 8), registers.SP);
            registers.SP--;
            memory.write(value & 0x00FF, registers.SP);
            registers.PC += 1;
            return 16;
        },
        POP_RR: function (registers: Registers, memory: Memory, reg: string) {
            const low = memory.read(registers.SP);
            registers.SP++;
            const high = memory.read(registers.SP);
            registers.SP++;
            registers.setReg(reg, (high << 8) | low);
            registers.PC += 1;
            return 12;
        },
        RET_CC0_ADR: function (registers: Registers, memory: Memory, flag: string) {
            registers.PC += 1;
            if (!registers.getFlag(flag)) {
                const low = memory.read(registers.SP);
                registers.SP++;
                const high = memory.read(registers.SP);
                registers.SP++;
                registers.PC = (high << 8) | low;
                return 20;
            }
            return 8;
        },
        RET_CC1_ADR: function (registers: Registers, memory: Memory, flag: string) {
            registers.PC += 1;
            if (registers.getFlag(flag)) {
                const low = memory.read(registers.SP);
                registers.SP++;
                const high = memory.read(registers.SP);
                registers.SP++;
                registers.PC = (high << 8) | low;
                return 20;
            }
            return 8;
        },
        RET_ADR: function (registers: Registers, memory: Memory) {
            registers.PC += 1;
            const low = memory.read(registers.SP);
            registers.SP++;
            const high = memory.read(registers.SP);
            registers.SP++;
            registers.PC = (high << 8) | low;
            return 16;
        },
        RETI: function (registers: Registers, memory: Memory) {
            registers.PC += 1;
            const low = memory.read(registers.SP);
            registers.SP++;
            const high = memory.read(registers.SP);
            registers.SP++;
            registers.PC = (high << 8) | low;
            registers.flagIME = true;
            return 16;
        },
        RST: function (registers: Registers, memory: Memory, direction: number) {
            registers.PC += 1;
            registers.SP--;
            memory.write((registers.PC & 0xFF00) >> 8, registers.SP);
            registers.SP--;
            memory.write(registers.PC & 0x00FF, registers.SP);
            registers.PC = direction;
            return 16;
        }
    },
    ADD: {
        DEC_R: function (registers: Registers, reg: string) {
            const value = registers.getReg(reg);
            const result = (value - 1) & 0xFF;
            registers.flagZ = result === 0;
            registers.flagH = ((((value & 0xF) - 1) >> 4) & 1) === 1;
            registers.flagN = true;
            registers.setReg(reg, result);
            registers.PC += 1;
            return 4;
        },
        DEC_RADR: function (registers: Registers, memory: Memory, reg: string) {
            const direction = registers.getReg(reg);
            const value = memory.read(direction);
            const result = (value - 1) & 0xFF;
            registers.flagZ = result === 0;
            registers.flagH = ((((value & 0xF) - 1) >> 4) & 1) === 1;
            registers.flagN = true;
            memory.write(result, direction);
            registers.PC += 1;
            return 12;
        },
        INC_R: function (registers: Registers, reg: string) {
            const value = registers.getReg(reg);
            const result = (value + 1) & 0xFF;
            registers.flagZ = result === 0;
            registers.flagH = (((value & 0xF) + 1) >> 4) === 1;
            registers.flagN = false;
            registers.setReg(reg, result);
            registers.PC += 1;
            return 4;
        },
        INC_RADR: function (registers: Registers, memory: Memory, reg: string) {
            const direction = registers.getReg(reg);
            const value = memory.read(direction);
            const result = (value + 1) & 0xFF;
            registers.flagZ = result === 0;
            registers.flagH = (((value & 0xF) + 1) >> 4) === 1;
            registers.flagN = false;
            memory.write(result, direction);
            registers.PC += 1;
            return 12;
        },
        DEC_RR: function (registers: Registers, reg: string) {
            registers.setReg(reg, (registers.getReg(reg) - 1) & 0xFFFF);
            registers.PC += 1;
            return 8;
        },
        INC_RR: function (registers: Registers, reg: string) {
            registers.setReg(reg, (registers.getReg(reg) + 1) & 0xFFFF);
            registers.PC += 1;
            return 8;
        },
        ADD_R_R: function (registers: Registers, destiny: string, origin: string) {
            const valueOrigin = registers.getReg(origin);
            const valueDestiny = registers.getReg(destiny);
            const value = valueOrigin + valueDestiny;
            registers.flagZ = (value & 0xFF) === 0;
            registers.flagH = (valueDestiny & 0x0F) + (valueOrigin & 0x0F) > 0x0F;
            registers.flagC = value > 0xFF;
            registers.flagN = false;
            registers.setReg(destiny, value & 0xFF);
            registers.PC += 1;
            return 4;
        },
        ADD_R_RADR: function (registers: Registers, memory: Memory, destiny: string, origin: string) {
            const valueOrigin = memory.read(registers.getReg(origin));
            const valueDestiny = registers.getReg(destiny);
            const value = valueOrigin + valueDestiny;
            registers.flagZ = (value & 0xFF) == 0;
            registers.flagH = (valueDestiny & 0x0F) + (valueOrigin & 0x0F) > 0x0F;
            registers.flagC = value > 0xFF;
            registers.flagN = false;
            registers.setReg(destiny, value & 0xFF);
            registers.PC += 1;
            return 8;
        },
        ADD_RR_RR: function (registers: Registers, destiny: string, origin: string) {
            const valueOrigin = registers.getReg(origin);
            const valueDestiny = registers.getReg(destiny);
            const value = valueOrigin + valueDestiny;
            registers.flagH = (valueDestiny & 0x0FFF) + (valueOrigin & 0x0FFF) > 0x0FFF;
            registers.flagC = value > 0xFFFF;
            registers.flagN = false;
            registers.setReg(destiny, value & 0xFFFF);
            registers.PC += 1;
            return 8;
        },
        ADD_R_NN: function (registers: Registers, memory: Memory, reg: string) {
            let value = memory.read(registers.PC + 1);
            if (value > 127) value -= 256;
            const result = registers.getReg(reg) + value;
            registers.setFlags(0);
            registers.flagH = ((registers.getReg(reg) & 0x0F) + (value & 0x0F)) > 0x0F;
            registers.flagC = ((registers.getReg(reg) & 0xFF) + (value & 0xFF)) > 0xFF;
            registers.setReg(reg, result & 0xFFFF);
            registers.PC += 2;
            return 16;
        },
        ADD_R_N: function (registers: Registers, memory: Memory, reg: string) {
            const value = memory.read(registers.PC + 1);
            const result = registers.getReg(reg) + value;
            registers.flagZ = (result & 0xFF) == 0;
            registers.flagC = result > 0xFF;
            registers.flagH = ((registers.getReg(reg) & 0x0F) + (value & 0x0F)) > 0x0F;
            registers.flagN = false;
            registers.setReg(reg, result & 0xFF);
            registers.PC += 2;
            return 8;
        },
        CP_R: function (registers: Registers, reg: string) {
            const value = registers.getReg(reg);
            registers.flagZ = registers.A == value;
            registers.flagC = registers.A < value;
            registers.flagH = (registers.A & 0x0F) < (value & 0x0F);
            registers.flagN = true;
            registers.PC += 1;
            return 4;
        },
        CP_RADR: function (registers: Registers, memory: Memory, reg: string) {
            const value = memory.read(registers.getReg(reg));
            registers.flagZ = registers.A == value;
            registers.flagC = registers.A < value;
            registers.flagH = (registers.A & 0x0F) < (value & 0x0F);
            registers.flagN = true;
            registers.PC += 1;
            return 8;
        },
        CP_N: function (registers: Registers, memory: Memory) {
            const value = memory.read(registers.PC + 1);
            registers.flagZ = registers.A == value;
            registers.flagC = registers.A < value;
            registers.flagH = (registers.A & 0x0F) < (value & 0x0F);
            registers.flagN = true;
            registers.PC += 2;
            return 8;
        },
        SBC_R_R: function (registers: Registers, destiny: string, origin: string) {
            const valueOrigin = registers.getReg(origin);
            const valueDestiny = registers.getReg(destiny);
            const value = valueDestiny - valueOrigin - (registers.flagC ? 1 : 0);
            registers.flagZ = (value & 0xFF) == 0;
            registers.flagH = (valueDestiny & 0x0F) < ((valueOrigin & 0x0F) + (registers.flagC ? 1 : 0));
            registers.flagC = value < 0;
            registers.flagN = true;
            registers.setReg(destiny, value & 0xFF);
            registers.PC += 1;
            return 4;
        },
        SUB_R_R: function (registers: Registers, destiny: string, origin: string) {
            const valueOrigin = registers.getReg(origin);
            const valueDestiny = registers.getReg(destiny);
            const value = valueDestiny - valueOrigin;
            registers.flagZ = (value & 0xFF) == 0;
            registers.flagH = (valueDestiny & 0x0F) < (valueOrigin & 0x0F);
            registers.flagC = value < 0;
            registers.flagN = true;
            registers.setReg(destiny, value & 0xFF);
            registers.PC += 1;
            return 4;
        },
        SUB_R_RADR: function (registers: Registers, memory: Memory, destiny: string, origin: string) {
            const valueOrigin = memory.read(registers.getReg(origin));
            const valueDestiny = registers.getReg(destiny);
            const value = valueDestiny - valueOrigin;
            registers.flagZ = (value & 0xFF) == 0;
            registers.flagH = (valueDestiny & 0x0F) < (valueOrigin & 0x0F);
            registers.flagC = value < 0;
            registers.flagN = true;
            registers.setReg(destiny, value & 0xFF);
            registers.PC += 1;
            return 8;
        },
        SBC_R_N: function (registers: Registers, memory: Memory, reg: string) {
            const valueOrigin = memory.read(registers.PC + 1);
            const valueDestiny = registers.getReg(reg);
            const value = valueDestiny - valueOrigin - (registers.flagC ? 1 : 0);
            registers.flagZ = (value & 0xFF) == 0;
            registers.flagH = (valueDestiny & 0x0F) < ((valueOrigin & 0x0F) + (registers.flagC ? 1 : 0));
            registers.flagC = value < 0;
            registers.flagN = true;
            registers.setReg(reg, value & 0xFF);
            registers.PC += 2;
            return 8;
        },
        ADC_R_R: function (registers: Registers, destiny: string, origin: string) {
            const valueOrigin = registers.getReg(origin);
            const valueDestiny = registers.getReg(destiny);
            const value = valueDestiny + valueOrigin + (registers.flagC ? 1 : 0);
            registers.flagZ = (value & 0xFF) == 0;
            registers.flagH = (valueDestiny & 0x0F) + (valueOrigin & 0x0F) + (registers.flagC ? 1 : 0) > 0x0F;
            registers.flagC = value > 0xFF;
            registers.flagN = false;
            registers.setReg(destiny, value & 0xFF);
            registers.PC += 1;
            return 4;
        },
        ADC_R_RADR: function (registers: Registers, memory: Memory, destiny: string, origin: string) {
            const valueOrigin = memory.read(registers.getReg(origin));
            const valueDestiny = registers.getReg(destiny);
            const value = valueDestiny + valueOrigin + (registers.flagC ? 1 : 0);
            registers.flagZ = (value & 0xFF) == 0;
            registers.flagH = (valueDestiny & 0x0F) + (valueOrigin & 0x0F) + (registers.flagC ? 1 : 0) > 0x0F;
            registers.flagC = value > 0xFF;
            registers.flagN = false;
            registers.setReg(destiny, value & 0xFF);
            registers.PC += 1;
            return 8;
        },
        ADC_R_N: function (registers: Registers, memory: Memory, reg: string) {
            const valueOrigin = memory.read(registers.PC + 1);
            const valueDestiny = registers.getReg(reg);
            const value = valueDestiny + valueOrigin + (registers.flagC ? 1 : 0);
            registers.flagZ = (value & 0xFF) == 0;
            registers.flagH = (valueDestiny & 0x0F) + (valueOrigin & 0x0F) + (registers.flagC ? 1 : 0) > 0x0F;
            registers.flagC = value > 0xFF;
            registers.flagN = false;
            registers.setReg(reg, value & 0xFF);
            registers.PC += 2;
            return 8;
        },
        SUB_R_N: function (registers: Registers, memory: Memory, reg: string) {
            const valueOrigin = memory.read(registers.PC + 1);
            const valueDestiny = registers.getReg(reg);
            const value = valueDestiny - valueOrigin;
            registers.flagZ = (value & 0xFF) == 0;
            registers.flagH = (valueDestiny & 0x0F) < (valueOrigin & 0x0F);
            registers.flagC = value < 0;
            registers.flagN = true;
            registers.setReg(reg, value & 0xFF);
            registers.PC += 2;
            return 8;
        },
        SBC_R_RADR: function (registers: Registers, memory: Memory, destiny: string, origin: string) {
            const valueOrigin = memory.read(registers.getReg(origin));
            const valueDestiny = registers.getReg(destiny);
            const value = valueDestiny - valueOrigin - (registers.flagC ? 1 : 0);
            registers.flagZ = (value & 0xFF) == 0;
            registers.flagH = (valueDestiny & 0x0F) < ((valueOrigin & 0x0F) + (registers.flagC ? 1 : 0));
            registers.flagC = value < 0;
            registers.flagN = true;
            registers.setReg(destiny, value & 0xFF);
            registers.PC += 1;
            return 8;
        },
        DAA: function (registers: Registers) {
            let result = registers.A;
            let correction = 0;
        
            if (registers.flagH) correction |= 0x06;
            if (registers.flagC) correction |= 0x60;
            if (registers.flagN) {
              result -= correction;
            } else {
              if ((result & 0x0F) > 0x09) correction |= 0x06;
              if (result > 0x99) correction |= 0x60;
              result += correction;
            }

            registers.flagZ = (result & 0xFF) == 0;
            registers.flagC = (correction & 0x60) !== 0;
            registers.flagH = false;

            registers.A = result & 0xFF;
            registers.PC += 1;
            return 4;
        }
    }
}

export const OPCODES: InstructionSet = {
    0x00: (registers: Registers, memory: Memory) => OPS.NOP(registers),
    0x01: (registers: Registers, memory: Memory) => OPS.LD.LD_DD_NN(registers, memory, 'BC'),
    0x02: (registers: Registers, memory: Memory) => OPS.LD.LD_RADR_R(registers, memory, 'BC', 'A'),
    0x03: (registers: Registers, memory: Memory) => OPS.ADD.INC_RR(registers, 'BC'),
    0x04: (registers: Registers, memory: Memory) => OPS.ADD.INC_R(registers, 'B'),
    0x05: (registers: Registers, memory: Memory) => OPS.ADD.DEC_R(registers, 'B'),
    0x06: (registers: Registers, memory: Memory) => OPS.LD.LD_R_N(registers, memory, 'B'),
    0x07: (registers: Registers, memory: Memory) => OPS.SHIFT.RLC(registers, 'A', false),
    0x08: (registers: Registers, memory: Memory) => OPS.LD.LD_ADR_RR(registers, memory, 'SP'),
    0x09: (registers: Registers, memory: Memory) => OPS.ADD.ADD_RR_RR(registers, 'HL', 'BC'),
    0x0A: (registers: Registers, memory: Memory) => OPS.LD.LD_R_RADR(registers, memory, 'A', 'BC'),
    0x0B: (registers: Registers, memory: Memory) => OPS.ADD.DEC_RR(registers, 'BC'),
    0x0C: (registers: Registers, memory: Memory) => OPS.ADD.INC_R(registers, 'C'),
    0x0D: (registers: Registers, memory: Memory) => OPS.ADD.DEC_R(registers, 'C'),
    0x0E: (registers: Registers, memory: Memory) => OPS.LD.LD_R_N(registers, memory, 'C'),
    0x0F: (registers: Registers, memory: Memory) => OPS.SHIFT.RRC(registers, 'A', false),

    0x10: (registers: Registers, memory: Memory) => OPS.INT.STOP(registers),
    0x11: (registers: Registers, memory: Memory) => OPS.LD.LD_DD_NN(registers, memory, 'DE'),
    0x12: (registers: Registers, memory: Memory) => OPS.LD.LD_RADR_R(registers, memory, 'DE', 'A'),
    0x13: (registers: Registers, memory: Memory) => OPS.ADD.INC_RR(registers, 'DE'),
    0x14: (registers: Registers, memory: Memory) => OPS.ADD.INC_R(registers, 'D'),
    0x15: (registers: Registers, memory: Memory) => OPS.ADD.DEC_R(registers, 'D'),
    0x16: (registers: Registers, memory: Memory) => OPS.LD.LD_R_N(registers, memory, 'D'),
    0x17: (registers: Registers, memory: Memory) => OPS.SHIFT.RL(registers, 'A', false),
    0x18: (registers: Registers, memory: Memory) => OPS.JUMP.JR_N(registers, memory),
    0x19: (registers: Registers, memory: Memory) => OPS.ADD.ADD_RR_RR(registers, 'HL', 'DE'),
    0x1A: (registers: Registers, memory: Memory) => OPS.LD.LD_R_RADR(registers, memory, 'A', 'DE'),
    0x1B: (registers: Registers, memory: Memory) => OPS.ADD.DEC_RR(registers, 'DE'),
    0x1C: (registers: Registers, memory: Memory) => OPS.ADD.INC_R(registers, 'E'),
    0x1D: (registers: Registers, memory: Memory) => OPS.ADD.DEC_R(registers, 'E'),
    0x1E: (registers: Registers, memory: Memory) => OPS.LD.LD_R_N(registers, memory, 'E'),
    0x1F: (registers: Registers, memory: Memory) => OPS.SHIFT.RR(registers, 'A', false),

    0x20: (registers: Registers, memory: Memory) => OPS.JUMP.JR_CC0_N(registers, memory, 'Z'),
    0x21: (registers: Registers, memory: Memory) => OPS.LD.LD_DD_NN(registers, memory, 'HL'),
    0x22: (registers: Registers, memory: Memory) => OPS.LD.LDI_RADR_R(registers, memory, 'HL', 'A'),
    0x23: (registers: Registers, memory: Memory) => OPS.ADD.INC_RR(registers, 'HL'),
    0x24: (registers: Registers, memory: Memory) => OPS.ADD.INC_R(registers, 'H'),
    0x25: (registers: Registers, memory: Memory) => OPS.ADD.DEC_R(registers, 'H'),
    0x26: (registers: Registers, memory: Memory) => OPS.LD.LD_R_N(registers, memory, 'H'),
    0x27: (registers: Registers, memory: Memory) => OPS.ADD.DAA(registers),
    0x28: (registers: Registers, memory: Memory) => OPS.JUMP.JR_CC1_N(registers, memory, 'Z'),
    0x29: (registers: Registers, memory: Memory) => OPS.ADD.ADD_RR_RR(registers, 'HL', 'HL'),
    0x2A: (registers: Registers, memory: Memory) => OPS.LD.LDI_R_RADR(registers, memory, 'A', 'HL'),
    0x2B: (registers: Registers, memory: Memory) => OPS.ADD.DEC_RR(registers, 'HL'),
    0x2C: (registers: Registers, memory: Memory) => OPS.ADD.INC_R(registers, 'L'),
    0x2D: (registers: Registers, memory: Memory) => OPS.ADD.DEC_R(registers, 'L'),
    0x2E: (registers: Registers, memory: Memory) => OPS.LD.LD_R_N(registers, memory, 'L'),
    0x2F: (registers: Registers, memory: Memory) => OPS.COMP.CPL(registers),

    0x30: (registers: Registers, memory: Memory) => OPS.JUMP.JR_CC0_N(registers, memory, 'C'),
    0x31: (registers: Registers, memory: Memory) => OPS.LD.LD_DD_NN(registers, memory, 'SP'),
    0x32: (registers: Registers, memory: Memory) => OPS.LD.LDD_RADR_R(registers, memory, 'HL', 'A'),
    0x33: (registers: Registers, memory: Memory) => OPS.ADD.INC_RR(registers, 'SP'),
    0x34: (registers: Registers, memory: Memory) => OPS.ADD.INC_RADR(registers, memory, 'HL'),
    0x35: (registers: Registers, memory: Memory) => OPS.ADD.DEC_RADR(registers, memory, 'HL'),
    0x36: (registers: Registers, memory: Memory) => OPS.LD.LD_RADR_N(registers, memory, 'HL'),
    0x37: (registers: Registers, memory: Memory) => OPS.COMP.SCF(registers),
    0x38: (registers: Registers, memory: Memory) => OPS.JUMP.JR_CC1_N(registers, memory, 'C'),
    0x39: (registers: Registers, memory: Memory) => OPS.ADD.ADD_RR_RR(registers, 'HL', 'SP'),
    0x3A: (registers: Registers, memory: Memory) => OPS.LD.LDD_R_RADR(registers, memory, 'A', 'HL'),
    0x3B: (registers: Registers, memory: Memory) => OPS.ADD.DEC_RR(registers, 'SP'),
    0x3C: (registers: Registers, memory: Memory) => OPS.ADD.INC_R(registers, 'A'),
    0x3D: (registers: Registers, memory: Memory) => OPS.ADD.DEC_R(registers, 'A'),
    0x3E: (registers: Registers, memory: Memory) => OPS.LD.LD_R_N(registers, memory, 'A'),
    0x3F: (registers: Registers, memory: Memory) => OPS.COMP.CCF(registers),

    0x40: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'B', 'B'),
    0x41: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'B', 'C'),
    0x42: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'B', 'D'),
    0x43: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'B', 'E'),
    0x44: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'B', 'H'),
    0x45: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'B', 'L'),
    0x46: (registers: Registers, memory: Memory) => OPS.LD.LD_R_RADR(registers, memory, 'B', 'HL'),
    0x47: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'B', 'A'),
    0x48: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'C', 'B'),
    0x49: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'C', 'C'),
    0x4A: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'C', 'D'),
    0x4B: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'C', 'E'),
    0x4C: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'C', 'H'),
    0x4D: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'C', 'L'),
    0x4E: (registers: Registers, memory: Memory) => OPS.LD.LD_R_RADR(registers, memory, 'C', 'HL'),
    0x4F: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'C', 'A'),

    0x50: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'D', 'B'),
    0x51: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'D', 'C'),
    0x52: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'D', 'D'),
    0x53: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'D', 'E'),
    0x54: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'D', 'H'),
    0x55: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'D', 'L'),
    0x56: (registers: Registers, memory: Memory) => OPS.LD.LD_R_RADR(registers, memory, 'D', 'HL'),
    0x57: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'D', 'A'),
    0x58: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'E', 'B'),
    0x59: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'E', 'C'),
    0x5A: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'E', 'D'),
    0x5B: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'E', 'E'),
    0x5C: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'E', 'H'),
    0x5D: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'E', 'L'),
    0x5E: (registers: Registers, memory: Memory) => OPS.LD.LD_R_RADR(registers, memory, 'E', 'HL'),
    0x5F: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'E', 'A'),

    0x60: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'H', 'B'),
    0x61: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'H', 'C'),
    0x62: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'H', 'D'),
    0x63: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'H', 'E'),
    0x64: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'H', 'H'),
    0x65: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'H', 'L'),
    0x66: (registers: Registers, memory: Memory) => OPS.LD.LD_R_RADR(registers, memory, 'H', 'HL'),
    0x67: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'H', 'A'),
    0x68: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'L', 'B'),
    0x69: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'L', 'C'),
    0x6A: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'L', 'D'),
    0x6B: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'L', 'E'),
    0x6C: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'L', 'H'),
    0x6D: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'L', 'L'),
    0x6E: (registers: Registers, memory: Memory) => OPS.LD.LD_R_RADR(registers, memory, 'L', 'HL'),
    0x6F: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'L', 'A'),

    0x70: (registers: Registers, memory: Memory) => OPS.LD.LD_RADR_R(registers, memory, 'HL', 'B'),
    0x71: (registers: Registers, memory: Memory) => OPS.LD.LD_RADR_R(registers, memory, 'HL', 'C'),
    0x72: (registers: Registers, memory: Memory) => OPS.LD.LD_RADR_R(registers, memory, 'HL', 'D'),
    0x73: (registers: Registers, memory: Memory) => OPS.LD.LD_RADR_R(registers, memory, 'HL', 'E'),
    0x74: (registers: Registers, memory: Memory) => OPS.LD.LD_RADR_R(registers, memory, 'HL', 'H'),
    0x75: (registers: Registers, memory: Memory) => OPS.LD.LD_RADR_R(registers, memory, 'HL', 'L'),
    0x76: (registers: Registers, memory: Memory) => OPS.INT.HALT(registers, memory),
    0x77: (registers: Registers, memory: Memory) => OPS.LD.LD_RADR_R(registers, memory, 'HL', 'A'),
    0x78: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'A', 'B'),
    0x79: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'A', 'C'),
    0x7A: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'A', 'D'),
    0x7B: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'A', 'E'),
    0x7C: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'A', 'H'),
    0x7D: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'A', 'L'),
    0x7E: (registers: Registers, memory: Memory) => OPS.LD.LD_R_RADR(registers, memory, 'A', 'HL'),
    0x7F: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'A', 'A'),

    0x80: (registers: Registers, memory: Memory) => OPS.ADD.ADD_R_R(registers, 'A', 'B'),
    0x81: (registers: Registers, memory: Memory) => OPS.ADD.ADD_R_R(registers, 'A', 'C'),
    0x82: (registers: Registers, memory: Memory) => OPS.ADD.ADD_R_R(registers, 'A', 'D'),
    0x83: (registers: Registers, memory: Memory) => OPS.ADD.ADD_R_R(registers, 'A', 'E'),
    0x84: (registers: Registers, memory: Memory) => OPS.ADD.ADD_R_R(registers, 'A', 'H'),
    0x85: (registers: Registers, memory: Memory) => OPS.ADD.ADD_R_R(registers, 'A', 'L'),
    0x86: (registers: Registers, memory: Memory) => OPS.ADD.ADD_R_RADR(registers, memory, 'A', 'HL'),
    0x87: (registers: Registers, memory: Memory) => OPS.ADD.ADD_R_R(registers, 'A', 'A'),
    0x88: (registers: Registers, memory: Memory) => OPS.ADD.ADC_R_R(registers, 'A', 'B'),
    0x89: (registers: Registers, memory: Memory) => OPS.ADD.ADC_R_R(registers, 'A', 'C'),
    0x8A: (registers: Registers, memory: Memory) => OPS.ADD.ADC_R_R(registers, 'A', 'D'),
    0x8B: (registers: Registers, memory: Memory) => OPS.ADD.ADC_R_R(registers, 'A', 'E'),
    0x8C: (registers: Registers, memory: Memory) => OPS.ADD.ADC_R_R(registers, 'A', 'H'),
    0x8D: (registers: Registers, memory: Memory) => OPS.ADD.ADC_R_R(registers, 'A', 'L'),
    0x8E: (registers: Registers, memory: Memory) => OPS.ADD.ADC_R_RADR(registers, memory, 'A', 'HL'),
    0x8F: (registers: Registers, memory: Memory) => OPS.ADD.ADC_R_R(registers, 'A', 'A'),

    0x90: (registers: Registers, memory: Memory) => OPS.ADD.SUB_R_R(registers, 'A', 'B'),
    0x91: (registers: Registers, memory: Memory) => OPS.ADD.SUB_R_R(registers, 'A', 'C'),
    0x92: (registers: Registers, memory: Memory) => OPS.ADD.SUB_R_R(registers, 'A', 'D'),
    0x93: (registers: Registers, memory: Memory) => OPS.ADD.SUB_R_R(registers, 'A', 'E'),
    0x94: (registers: Registers, memory: Memory) => OPS.ADD.SUB_R_R(registers, 'A', 'H'),
    0x95: (registers: Registers, memory: Memory) => OPS.ADD.SUB_R_R(registers, 'A', 'L'),
    0x96: (registers: Registers, memory: Memory) => OPS.ADD.SUB_R_RADR(registers, memory, 'A', 'HL'),
    0x97: (registers: Registers, memory: Memory) => OPS.ADD.SUB_R_R(registers, 'A', 'A'),
    0x98: (registers: Registers, memory: Memory) => OPS.ADD.SBC_R_R(registers, 'A', 'B'),
    0x99: (registers: Registers, memory: Memory) => OPS.ADD.SBC_R_R(registers, 'A', 'C'),
    0x9A: (registers: Registers, memory: Memory) => OPS.ADD.SBC_R_R(registers, 'A', 'D'),
    0x9B: (registers: Registers, memory: Memory) => OPS.ADD.SBC_R_R(registers, 'A', 'E'),
    0x9C: (registers: Registers, memory: Memory) => OPS.ADD.SBC_R_R(registers, 'A', 'H'),
    0x9D: (registers: Registers, memory: Memory) => OPS.ADD.SBC_R_R(registers, 'A', 'L'),
    0x9E: (registers: Registers, memory: Memory) => OPS.ADD.SBC_R_RADR(registers, memory, 'A', 'HL'),
    0x9F: (registers: Registers, memory: Memory) => OPS.ADD.SBC_R_R(registers, 'A', 'A'),

    0xA0: (registers: Registers, memory: Memory) => OPS.LOGIC.AND_R_R(registers, 'B'),
    0xA1: (registers: Registers, memory: Memory) => OPS.LOGIC.AND_R_R(registers, 'C'),
    0xA2: (registers: Registers, memory: Memory) => OPS.LOGIC.AND_R_R(registers, 'D'),
    0xA3: (registers: Registers, memory: Memory) => OPS.LOGIC.AND_R_R(registers, 'E'),
    0xA4: (registers: Registers, memory: Memory) => OPS.LOGIC.AND_R_R(registers, 'H'),
    0xA5: (registers: Registers, memory: Memory) => OPS.LOGIC.AND_R_R(registers, 'L'),
    0xA6: (registers: Registers, memory: Memory) => OPS.LOGIC.AND_RADR(registers, memory, 'HL'),
    0xA7: (registers: Registers, memory: Memory) => OPS.LOGIC.AND_R_R(registers, 'A'),
    0xA8: (registers: Registers, memory: Memory) => OPS.LOGIC.XOR_R(registers, 'B'),
    0xA9: (registers: Registers, memory: Memory) => OPS.LOGIC.XOR_R(registers, 'C'),
    0xAA: (registers: Registers, memory: Memory) => OPS.LOGIC.XOR_R(registers, 'D'),
    0xAB: (registers: Registers, memory: Memory) => OPS.LOGIC.XOR_R(registers, 'E'),
    0xAC: (registers: Registers, memory: Memory) => OPS.LOGIC.XOR_R(registers, 'H'),
    0xAD: (registers: Registers, memory: Memory) => OPS.LOGIC.XOR_R(registers, 'L'),
    0xAE: (registers: Registers, memory: Memory) => OPS.LOGIC.XOR_RADR(registers, memory, 'HL'),
    0xAF: (registers: Registers, memory: Memory) => OPS.LOGIC.XOR_R(registers, 'A'),

    0xB0: (registers: Registers, memory: Memory) => OPS.LOGIC.OR_R_R(registers, 'B'),
    0xB1: (registers: Registers, memory: Memory) => OPS.LOGIC.OR_R_R(registers, 'C'),
    0xB2: (registers: Registers, memory: Memory) => OPS.LOGIC.OR_R_R(registers, 'D'),
    0xB3: (registers: Registers, memory: Memory) => OPS.LOGIC.OR_R_R(registers, 'E'),
    0xB4: (registers: Registers, memory: Memory) => OPS.LOGIC.OR_R_R(registers, 'H'),
    0xB5: (registers: Registers, memory: Memory) => OPS.LOGIC.OR_R_R(registers, 'L'),
    0xB6: (registers: Registers, memory: Memory) => OPS.LOGIC.OR_R_ADR(registers, memory, 'HL'),
    0xB7: (registers: Registers, memory: Memory) => OPS.LOGIC.OR_R_R(registers, 'A'),
    0xB8: (registers: Registers, memory: Memory) => OPS.ADD.CP_R(registers, 'B'),
    0xB9: (registers: Registers, memory: Memory) => OPS.ADD.CP_R(registers, 'C'),
    0xBA: (registers: Registers, memory: Memory) => OPS.ADD.CP_R(registers, 'D'),
    0xBB: (registers: Registers, memory: Memory) => OPS.ADD.CP_R(registers, 'E'),
    0xBC: (registers: Registers, memory: Memory) => OPS.ADD.CP_R(registers, 'H'),
    0xBD: (registers: Registers, memory: Memory) => OPS.ADD.CP_R(registers, 'L'),
    0xBE: (registers: Registers, memory: Memory) => OPS.ADD.CP_RADR(registers, memory, 'HL'),
    0xBF: (registers: Registers, memory: Memory) => OPS.ADD.CP_R(registers, 'A'),

    0xC0: (registers: Registers, memory: Memory) => OPS.JUMP.RET_CC0_ADR(registers, memory, 'Z'),
    0xC1: (registers: Registers, memory: Memory) => OPS.JUMP.POP_RR(registers, memory, 'BC'),
    0xC2: (registers: Registers, memory: Memory) => OPS.JUMP.JP_CC0_ADR(registers, memory, 'Z'),
    0xC3: (registers: Registers, memory: Memory) => OPS.JUMP.JP_ADR(registers, memory),
    0xC4: (registers: Registers, memory: Memory) => OPS.JUMP.CALL_CC0_ADR(registers, memory, 'Z'),
    0xC5: (registers: Registers, memory: Memory) => OPS.JUMP.PUSH_RR(registers, memory, 'BC'),
    0xC6: (registers: Registers, memory: Memory) => OPS.ADD.ADD_R_N(registers, memory, 'A'),
    0xC7: (registers: Registers, memory: Memory) => OPS.JUMP.RST(registers, memory, 0x00),
    0xC8: (registers: Registers, memory: Memory) => OPS.JUMP.RET_CC1_ADR(registers, memory, 'Z'),
    0xC9: (registers: Registers, memory: Memory) => OPS.JUMP.RET_ADR(registers, memory),
    0xCA: (registers: Registers, memory: Memory) => OPS.JUMP.JP_CC1_ADR(registers, memory, 'Z'),
    // 0xCB:
    0xCC: (registers: Registers, memory: Memory) => OPS.JUMP.CALL_CC1_ADR(registers, memory, 'Z'),
    0xCD: (registers: Registers, memory: Memory) => OPS.JUMP.CALL_ADR(registers, memory),
    0xCE: (registers: Registers, memory: Memory) => OPS.ADD.ADC_R_N(registers, memory, 'A'),
    0xCF: (registers: Registers, memory: Memory) => OPS.JUMP.RST(registers, memory, 0x08),

    0xD0: (registers: Registers, memory: Memory) => OPS.JUMP.RET_CC0_ADR(registers, memory, 'C'),
    0xD1: (registers: Registers, memory: Memory) => OPS.JUMP.POP_RR(registers, memory, 'DE'),
    0xD2: (registers: Registers, memory: Memory) => OPS.JUMP.JP_CC0_ADR(registers, memory, 'C'),
    // 0xD3: 
    0xD4: (registers: Registers, memory: Memory) => OPS.JUMP.CALL_CC0_ADR(registers, memory, 'C'),
    0xD5: (registers: Registers, memory: Memory) => OPS.JUMP.PUSH_RR(registers, memory, 'DE'),
    0xD6: (registers: Registers, memory: Memory) => OPS.ADD.SUB_R_N(registers, memory, 'A'),
    0xD7: (registers: Registers, memory: Memory) => OPS.JUMP.RST(registers, memory, 0x10),
    0xD8: (registers: Registers, memory: Memory) => OPS.JUMP.RET_CC1_ADR(registers, memory, 'C'),
    0xD9: (registers: Registers, memory: Memory) => OPS.JUMP.RETI(registers, memory),
    0xDA: (registers: Registers, memory: Memory) => OPS.JUMP.JP_CC1_ADR(registers, memory, 'C'),
    // 0xDB:
    0xDC: (registers: Registers, memory: Memory) => OPS.JUMP.CALL_CC1_ADR(registers, memory, 'C'),
    // 0xDD: 
    0xDE: (registers: Registers, memory: Memory) => OPS.ADD.SBC_R_N(registers, memory, 'A'),
    0xDF: (registers: Registers, memory: Memory) => OPS.JUMP.RST(registers, memory, 0x18),

    0xE0: (registers: Registers, memory: Memory) => OPS.LD.LD_DADR_R(registers, memory, 'A'),
    0xE1: (registers: Registers, memory: Memory) => OPS.JUMP.POP_RR(registers, memory, 'HL'),
    0xE2: (registers: Registers, memory: Memory) => OPS.LD.LD_DR_R(registers, memory, 'C', 'A'),
    // 0xE3: 
    // 0xE4:
    0xE5: (registers: Registers, memory: Memory) => OPS.JUMP.PUSH_RR(registers, memory, 'HL'),
    0xE6: (registers: Registers, memory: Memory) => OPS.LOGIC.AND_R_N(registers, memory),
    0xE7: (registers: Registers, memory: Memory) => OPS.JUMP.RST(registers, memory, 0x20),
    0xE8: (registers: Registers, memory: Memory) => OPS.ADD.ADD_R_NN(registers, memory, 'SP'),
    0xE9: (registers: Registers, memory: Memory) => OPS.JUMP.JP_RADR(registers, 'HL'),
    0xEA: (registers: Registers, memory: Memory) => OPS.LD.LD_ADR_R(registers, memory, 'A'),
    // 0xEB:
    // 0xEC:
    // 0xED: 
    0xEE: (registers: Registers, memory: Memory) => OPS.LOGIC.XOR_N(registers, memory),
    0xEF: (registers: Registers, memory: Memory) => OPS.JUMP.RST(registers, memory, 0x28),

    0xF0: (registers: Registers, memory: Memory) => OPS.LD.LD_R_DADR(registers, memory, 'A'),
    0xF1: (registers: Registers, memory: Memory) => OPS.JUMP.POP_RR(registers, memory, 'AF'),
    0xF2: (registers: Registers, memory: Memory) => OPS.LD.LD_R_DR(registers, memory, 'A', 'C'),
    0xF3: (registers: Registers, memory: Memory) => OPS.INT.DI(registers),
    // 0xF4: 
    0xF5: (registers: Registers, memory: Memory) => OPS.JUMP.PUSH_RR(registers, memory, 'AF'),
    0xF6: (registers: Registers, memory: Memory) => OPS.LOGIC.OR_N(registers, memory),
    0xF7: (registers: Registers, memory: Memory) => OPS.JUMP.RST(registers, memory, 0x30),
    0xF8: (registers: Registers, memory: Memory) => OPS.LD.LD_R_SPD(registers, memory, 'HL'),
    0xF9: (registers: Registers, memory: Memory) => OPS.LD.LD_R_R(registers, 'SP', 'HL'),
    0xFA: (registers: Registers, memory: Memory) => OPS.LD.LD_R_ADR(registers, memory, 'A'),
    0xFB: (registers: Registers, memory: Memory) => OPS.INT.EI(registers),
    // 0xFC: 
    // 0xFD:
    0xFE: (registers: Registers, memory: Memory) => OPS.ADD.CP_N(registers, memory),
    0xFF: (registers: Registers, memory: Memory) => OPS.JUMP.RST(registers, memory, 0x38)
}

export const OPCODES_CB: InstructionSet = {
    0x00: (registers: Registers, memory: Memory) => OPS.SHIFT.RLC(registers, 'B', true),
    0x01: (registers: Registers, memory: Memory) => OPS.SHIFT.RLC(registers, 'C', true),
    0x02: (registers: Registers, memory: Memory) => OPS.SHIFT.RLC(registers, 'D', true),
    0x03: (registers: Registers, memory: Memory) => OPS.SHIFT.RLC(registers, 'E', true),
    0x04: (registers: Registers, memory: Memory) => OPS.SHIFT.RLC(registers, 'H', true),
    0x05: (registers: Registers, memory: Memory) => OPS.SHIFT.RLC(registers, 'L', true),
    0x06: (registers: Registers, memory: Memory) => OPS.SHIFT.RLC_RADR(registers, memory, 'HL'),
    0x07: (registers: Registers, memory: Memory) => OPS.SHIFT.RLC(registers, 'A', true),
    0x08: (registers: Registers, memory: Memory) => OPS.SHIFT.RRC(registers, 'B', true),
    0x09: (registers: Registers, memory: Memory) => OPS.SHIFT.RRC(registers, 'C', true),
    0x0A: (registers: Registers, memory: Memory) => OPS.SHIFT.RRC(registers, 'D', true),
    0x0B: (registers: Registers, memory: Memory) => OPS.SHIFT.RRC(registers, 'E', true),
    0x0C: (registers: Registers, memory: Memory) => OPS.SHIFT.RRC(registers, 'H', true),
    0x0D: (registers: Registers, memory: Memory) => OPS.SHIFT.RRC(registers, 'L', true),
    0x0E: (registers: Registers, memory: Memory) => OPS.SHIFT.RRC_RADR(registers, memory, 'HL'),
    0x0F: (registers: Registers, memory: Memory) => OPS.SHIFT.RRC(registers, 'A', true),

    0x10: (registers: Registers, memory: Memory) => OPS.SHIFT.RL(registers, 'B', true),
    0x11: (registers: Registers, memory: Memory) => OPS.SHIFT.RL(registers, 'C', true),
    0x12: (registers: Registers, memory: Memory) => OPS.SHIFT.RL(registers, 'D', true),
    0x13: (registers: Registers, memory: Memory) => OPS.SHIFT.RL(registers, 'E', true),
    0x14: (registers: Registers, memory: Memory) => OPS.SHIFT.RL(registers, 'H', true),
    0x15: (registers: Registers, memory: Memory) => OPS.SHIFT.RL(registers, 'L', true),
    0x16: (registers: Registers, memory: Memory) => OPS.SHIFT.RL_RADR(registers, memory, 'HL'),
    0x17: (registers: Registers, memory: Memory) => OPS.SHIFT.RL(registers, 'A', true),
    0x18: (registers: Registers, memory: Memory) => OPS.SHIFT.RR(registers, 'B', true),
    0x19: (registers: Registers, memory: Memory) => OPS.SHIFT.RR(registers, 'C', true),
    0x1A: (registers: Registers, memory: Memory) => OPS.SHIFT.RR(registers, 'D', true),
    0x1B: (registers: Registers, memory: Memory) => OPS.SHIFT.RR(registers, 'E', true),
    0x1C: (registers: Registers, memory: Memory) => OPS.SHIFT.RR(registers, 'H', true),
    0x1D: (registers: Registers, memory: Memory) => OPS.SHIFT.RR(registers, 'L', true),
    0x1E: (registers: Registers, memory: Memory) => OPS.SHIFT.RR_RADR(registers, memory, 'HL'),
    0x1F: (registers: Registers, memory: Memory) => OPS.SHIFT.RR(registers, 'A', true),

    0x20: (registers: Registers, memory: Memory) => OPS.SHIFT.SLA(registers, 'B'),
    0x21: (registers: Registers, memory: Memory) => OPS.SHIFT.SLA(registers, 'C'),
    0x22: (registers: Registers, memory: Memory) => OPS.SHIFT.SLA(registers, 'D'),
    0x23: (registers: Registers, memory: Memory) => OPS.SHIFT.SLA(registers, 'E'),
    0x24: (registers: Registers, memory: Memory) => OPS.SHIFT.SLA(registers, 'H'),
    0x25: (registers: Registers, memory: Memory) => OPS.SHIFT.SLA(registers, 'L'),
    0x26: (registers: Registers, memory: Memory) => OPS.SHIFT.SLA_RADR(registers, memory, 'HL'),
    0x27: (registers: Registers, memory: Memory) => OPS.SHIFT.SLA(registers, 'A'),
    0x28: (registers: Registers, memory: Memory) => OPS.SHIFT.SRA(registers, 'B'),
    0x29: (registers: Registers, memory: Memory) => OPS.SHIFT.SRA(registers, 'C'),
    0x2A: (registers: Registers, memory: Memory) => OPS.SHIFT.SRA(registers, 'D'),
    0x2B: (registers: Registers, memory: Memory) => OPS.SHIFT.SRA(registers, 'E'),
    0x2C: (registers: Registers, memory: Memory) => OPS.SHIFT.SRA(registers, 'H'),
    0x2D: (registers: Registers, memory: Memory) => OPS.SHIFT.SRA(registers, 'L'),
    0x2E: (registers: Registers, memory: Memory) => OPS.SHIFT.SRA_RADR(registers, memory, 'HL'),
    0x2F: (registers: Registers, memory: Memory) => OPS.SHIFT.SRA(registers, 'A'),

    0x30: (registers: Registers, memory: Memory) => OPS.BIT.SWAP_R(registers, 'B'),
    0x31: (registers: Registers, memory: Memory) => OPS.BIT.SWAP_R(registers, 'C'),
    0x32: (registers: Registers, memory: Memory) => OPS.BIT.SWAP_R(registers, 'D'),
    0x33: (registers: Registers, memory: Memory) => OPS.BIT.SWAP_R(registers, 'E'),
    0x34: (registers: Registers, memory: Memory) => OPS.BIT.SWAP_R(registers, 'H'),
    0x35: (registers: Registers, memory: Memory) => OPS.BIT.SWAP_R(registers, 'L'),
    0x36: (registers: Registers, memory: Memory) => OPS.BIT.SWAP_RADR(registers, memory, 'HL'),
    0x37: (registers: Registers, memory: Memory) => OPS.BIT.SWAP_R(registers, 'A'),
    0x38: (registers: Registers, memory: Memory) => OPS.SHIFT.SRL(registers, 'B'),
    0x39: (registers: Registers, memory: Memory) => OPS.SHIFT.SRL(registers, 'C'),
    0x3A: (registers: Registers, memory: Memory) => OPS.SHIFT.SRL(registers, 'D'),
    0x3B: (registers: Registers, memory: Memory) => OPS.SHIFT.SRL(registers, 'E'),
    0x3C: (registers: Registers, memory: Memory) => OPS.SHIFT.SRL(registers, 'H'),
    0x3D: (registers: Registers, memory: Memory) => OPS.SHIFT.SRL(registers, 'L'),
    0x3E: (registers: Registers, memory: Memory) => OPS.SHIFT.SRL_RADR(registers, memory, 'HL'),
    0x3F: (registers: Registers, memory: Memory) => OPS.SHIFT.SRL(registers, 'A'),

    0x40: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x01, 'B'),
    0x41: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x01, 'C'),
    0x42: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x01, 'D'),
    0x43: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x01, 'E'),
    0x44: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x01, 'H'),
    0x45: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x01, 'L'),
    0x46: (registers: Registers, memory: Memory) => OPS.BIT.BIT_RADR(registers, memory, 0x01, 'HL'),
    0x47: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x01, 'A'),
    0x48: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x02, 'B'),
    0x49: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x02, 'C'),
    0x4A: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x02, 'D'),
    0x4B: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x02, 'E'),
    0x4C: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x02, 'H'),
    0x4D: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x02, 'L'),
    0x4E: (registers: Registers, memory: Memory) => OPS.BIT.BIT_RADR(registers, memory, 0x02, 'HL'),
    0x4F: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x02, 'A'),

    0x50: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x04, 'B'),
    0x51: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x04, 'C'),
    0x52: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x04, 'D'),
    0x53: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x04, 'E'),
    0x54: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x04, 'H'),
    0x55: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x04, 'L'),
    0x56: (registers: Registers, memory: Memory) => OPS.BIT.BIT_RADR(registers, memory, 0x04, 'HL'),
    0x57: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x04, 'A'),
    0x58: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x08, 'B'),
    0x59: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x08, 'C'),
    0x5A: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x08, 'D'),
    0x5B: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x08, 'E'),
    0x5C: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x08, 'H'),
    0x5D: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x08, 'L'),
    0x5E: (registers: Registers, memory: Memory) => OPS.BIT.BIT_RADR(registers, memory, 0x08, 'HL'),
    0x5F: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x08, 'A'),

    0x60: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x10, 'B'),
    0x61: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x10, 'C'),
    0x62: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x10, 'D'),
    0x63: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x10, 'E'),
    0x64: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x10, 'H'),
    0x65: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x10, 'L'),
    0x66: (registers: Registers, memory: Memory) => OPS.BIT.BIT_RADR(registers, memory, 0x10, 'HL'),
    0x67: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x10, 'A'),
    0x68: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x20, 'B'),
    0x69: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x20, 'C'),
    0x6A: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x20, 'D'),
    0x6B: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x20, 'E'),
    0x6C: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x20, 'H'),
    0x6D: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x20, 'L'),
    0x6E: (registers: Registers, memory: Memory) => OPS.BIT.BIT_RADR(registers, memory, 0x20, 'HL'),
    0x6F: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x20, 'A'),

    0x70: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x40, 'B'),
    0x71: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x40, 'C'),
    0x72: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x40, 'D'),
    0x73: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x40, 'E'),
    0x74: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x40, 'H'),
    0x75: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x40, 'L'),
    0x76: (registers: Registers, memory: Memory) => OPS.BIT.BIT_RADR(registers, memory, 0x40, 'HL'),
    0x77: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x40, 'A'),
    0x78: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x80, 'B'),
    0x79: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x80, 'C'),
    0x7A: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x80, 'D'),
    0x7B: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x80, 'E'),
    0x7C: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x80, 'H'),
    0x7D: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x80, 'L'),
    0x7E: (registers: Registers, memory: Memory) => OPS.BIT.BIT_RADR(registers, memory, 0x80, 'HL'),
    0x7F: (registers: Registers, memory: Memory) => OPS.BIT.BIT_R(registers, 0x80, 'A'),

    0x80: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x01, 'B'),
    0x81: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x01, 'C'),
    0x82: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x01, 'D'),
    0x83: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x01, 'E'),
    0x84: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x01, 'H'),
    0x85: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x01, 'L'),
    0x86: (registers: Registers, memory: Memory) => OPS.BIT.RES_RADR(registers, memory, 0x01, 'HL'),
    0x87: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x01, 'A'),
    0x88: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x02, 'B'),
    0x89: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x02, 'C'),
    0x8A: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x02, 'D'),
    0x8B: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x02, 'E'),
    0x8C: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x02, 'H'),
    0x8D: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x02, 'L'),
    0x8E: (registers: Registers, memory: Memory) => OPS.BIT.RES_RADR(registers, memory, 0x02, 'HL'),
    0x8F: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x02, 'A'),

    0x90: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x04, 'B'),
    0x91: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x04, 'C'),
    0x92: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x04, 'D'),
    0x93: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x04, 'E'),
    0x94: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x04, 'H'),
    0x95: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x04, 'L'),
    0x96: (registers: Registers, memory: Memory) => OPS.BIT.RES_RADR(registers, memory, 0x04, 'HL'),
    0x97: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x04, 'A'),
    0x98: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x08, 'B'),
    0x99: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x08, 'C'),
    0x9A: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x08, 'D'),
    0x9B: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x08, 'E'),
    0x9C: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x08, 'H'),
    0x9D: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x08, 'L'),
    0x9E: (registers: Registers, memory: Memory) => OPS.BIT.RES_RADR(registers, memory, 0x08, 'HL'),
    0x9F: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x08, 'A'),

    0xA0: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x10, 'B'),
    0xA1: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x10, 'C'),
    0xA2: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x10, 'D'),
    0xA3: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x10, 'E'),
    0xA4: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x10, 'H'),
    0xA5: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x10, 'L'),
    0xA6: (registers: Registers, memory: Memory) => OPS.BIT.RES_RADR(registers, memory, 0x10, 'HL'),
    0xA7: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x10, 'A'),
    0xA8: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x20, 'B'),
    0xA9: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x20, 'C'),
    0xAA: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x20, 'D'),
    0xAB: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x20, 'E'),
    0xAC: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x20, 'H'),
    0xAD: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x20, 'L'),
    0xAE: (registers: Registers, memory: Memory) => OPS.BIT.RES_RADR(registers, memory, 0x20, 'HL'),
    0xAF: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x20, 'A'),

    0xB0: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x40, 'B'),
    0xB1: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x40, 'C'),
    0xB2: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x40, 'D'),
    0xB3: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x40, 'E'),
    0xB4: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x40, 'H'),
    0xB5: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x40, 'L'),
    0xB6: (registers: Registers, memory: Memory) => OPS.BIT.RES_RADR(registers, memory, 0x40, 'HL'),
    0xB7: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x40, 'A'),
    0xB8: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x80, 'B'),
    0xB9: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x80, 'C'),
    0xBA: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x80, 'D'),
    0xBB: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x80, 'E'),
    0xBC: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x80, 'H'),
    0xBD: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x80, 'L'),
    0xBE: (registers: Registers, memory: Memory) => OPS.BIT.RES_RADR(registers, memory, 0x80, 'HL'),
    0xBF: (registers: Registers, memory: Memory) => OPS.BIT.RES_R(registers, 0x80, 'A'),

    0xC0: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x01, 'B'),
    0xC1: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x01, 'C'),
    0xC2: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x01, 'D'),
    0xC3: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x01, 'E'),
    0xC4: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x01, 'H'),
    0xC5: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x01, 'L'),
    0xC6: (registers: Registers, memory: Memory) => OPS.BIT.SET_RADR(registers, memory, 0x01, 'HL'),
    0xC7: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x01, 'A'),
    0xC8: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x02, 'B'),
    0xC9: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x02, 'C'),
    0xCA: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x02, 'D'),
    0xCB: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x02, 'E'),
    0xCC: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x02, 'H'),
    0xCD: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x02, 'L'),
    0xCE: (registers: Registers, memory: Memory) => OPS.BIT.SET_RADR(registers, memory, 0x02, 'HL'),
    0xCF: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x02, 'A'),

    0xD0: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x04, 'B'),
    0xD1: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x04, 'C'),
    0xD2: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x04, 'D'),
    0xD3: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x04, 'E'),
    0xD4: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x04, 'H'),
    0xD5: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x04, 'L'),
    0xD6: (registers: Registers, memory: Memory) => OPS.BIT.SET_RADR(registers, memory, 0x04, 'HL'),
    0xD7: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x04, 'A'),
    0xD8: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x08, 'B'),
    0xD9: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x08, 'C'),
    0xDA: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x08, 'D'),
    0xDB: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x08, 'E'),
    0xDC: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x08, 'H'),
    0xDD: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x08, 'L'),
    0xDE: (registers: Registers, memory: Memory) => OPS.BIT.SET_RADR(registers, memory, 0x08, 'HL'),
    0xDF: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x08, 'A'),

    0xE0: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x10, 'B'),
    0xE1: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x10, 'C'),
    0xE2: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x10, 'D'),
    0xE3: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x10, 'E'),
    0xE4: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x10, 'H'),
    0xE5: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x10, 'L'),
    0xE6: (registers: Registers, memory: Memory) => OPS.BIT.SET_RADR(registers, memory, 0x10, 'HL'),
    0xE7: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x10, 'A'),
    0xE8: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x20, 'B'),
    0xE9: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x20, 'C'),
    0xEA: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x20, 'D'),
    0xEB: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x20, 'E'),
    0xEC: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x20, 'H'),
    0xED: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x20, 'L'),
    0xEE: (registers: Registers, memory: Memory) => OPS.BIT.SET_RADR(registers, memory, 0x20, 'HL'),
    0xEF: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x20, 'A'),

    0xF0: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x40, 'B'),
    0xF1: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x40, 'C'),
    0xF2: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x40, 'D'),
    0xF3: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x40, 'E'),
    0xF4: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x40, 'H'),
    0xF5: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x40, 'L'),
    0xF6: (registers: Registers, memory: Memory) => OPS.BIT.SET_RADR(registers, memory, 0x40, 'HL'),
    0xF7: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x40, 'A'),
    0xF8: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x80, 'B'),
    0xF9: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x80, 'C'),
    0xFA: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x80, 'D'),
    0xFB: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x80, 'E'),
    0xFC: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x80, 'H'),
    0xFD: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x80, 'L'),
    0xFE: (registers: Registers, memory: Memory) => OPS.BIT.SET_RADR(registers, memory, 0x80, 'HL'),
    0xFF: (registers: Registers, memory: Memory) => OPS.BIT.SET_R(registers, 0x80, 'A'),

}
