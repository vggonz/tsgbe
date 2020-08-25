
export class Registers {

    // 8 bit registries
    private registers: {
        A: number;
        B: number;
        C: number;
        D: number;
        E: number;

        // 16 bits registries
        SP: number;
        PC: number;
        HL: number;
    }

    // flags
    private flags: {
        Z: boolean;
        H: boolean;
        N: boolean;
        C: boolean;
    }

    // Interrupt Master Enable
    private IME: boolean;

    constructor() {
        this.registers = {
            A: 0, B: 0,
            C: 0, D: 0,
            E: 0, SP: 0,
            PC: 0, HL: 0
        }
        this.flags = {
            Z: false,
            H: false,
            N: false,
            C: false
        }
    }

    public get A(): number { return this.registers.A; }
    public set A(value: number) { this.registers.A = value; }

    public get B(): number { return this.registers.B; }
    public set B(value: number) { this.registers.B = value; }

    public get C(): number { return this.registers.C; }
    public set C(value: number) { this.registers.C = value; }

    public get D(): number { return this.registers.D; }
    public set D(value: number) { this.registers.D = value; }

    public get E(): number { return this.registers.E; }
    public set E(value: number) { this.registers.E = value; }

    public get flagIME(): boolean { return this.IME; }
    public set flagIME(value: boolean) { this.IME = value; }

    public get SP(): number { return this.registers.SP; }
    public set SP(value: number) { this.registers.SP = value; }

    public get PC(): number { return this.registers.PC; }
    public set PC(value: number) { this.registers.PC = value; }

    public get HL(): number { return this.registers.HL; }
    public set HL(value: number) { this.registers.HL = value; }

    public get H(): number { return ((this.registers.HL & 0xFF00) >> 8); }
    public set H(value: number) { this.registers.HL = (this.registers.HL & 0x00FF) | (value << 8); }

    public get L(): number { return (this.registers.HL & 0x00FF); }
    public set L(value: number) { this.registers.HL = (this.registers.HL & 0xFF00) | value; }

    public get BC(): number { return (this.registers.B << 8) | this.registers.C; }
    public set BC(value: number) {
        this.registers.B = ((value & 0xFF00) >> 8);
        this.registers.C = (value & 0x00FF);
    }

    public get DE(): number { return (this.registers.D << 8) | this.registers.E; }
    public set DE(value: number) {
        this.registers.D = ((value & 0xFF00) >> 8);
        this.registers.E = (value & 0x00FF);
    }

    public get AF(): number { return (this.registers.A << 8) | this.getFlags(); }
    public set AF(value: number) {
        this.registers.A = ((value & 0xFF00) >> 8);
        this.setFlags(value & 0x00FF);
    }

    public get F(): number { return this.getFlags(); }
    public set F(value: number) { this.setFlags(value); }

    public get flagZ(): boolean { return this.flags.Z; }
    public set flagZ(value: boolean) { this.flags.Z = value; }

    public get flagN(): boolean { return this.flags.N; }
    public set flagN(value: boolean) { this.flags.N = value; }

    public get flagH(): boolean { return this.flags.H; }
    public set flagH(value: boolean) { this.flags.H = value; }

    public get flagC(): boolean { return this.flags.C; }
    public set flagC(value: boolean) { this.flags.C = value; }

    // Obtiene el estado de un flag por su nombre
    // Nombre del flag (Z, N, H, C)
    public getFlag(flag: string): boolean {
        let value: boolean = false;
        switch (flag) {
            case "Z": value = this.flags.Z; break;
            case "N": value = this.flags.N; break;
            case "H": value = this.flags.H; break;
            case "C": value = this.flags.C; break;
        }
        return value;
    }

    // Asigna un nuevo estado a un flag identificado por su nombre
    // El nombre del flag (Z, N, H, C)
    public setFlag(flag: string, value: boolean) {
        switch (flag) {
            case "Z": this.flags.Z = value; break;
            case "N": this.flags.N = value; break;
            case "H": this.flags.H = value; break;
            case "C": this.flags.C = value; break;
        }
    }

    // Obtiene el valor del registro con todos los flags
    public getFlags(): number {
        let flags: number = 0;
        const Z = 0x80; // 1000 0000
        const N = 0x40; // 0100 0000
        const H = 0x20; // 0010 0000
        const C = 0x10; // 0001 0000

        if (this.flags.Z == true) { flags |= Z; }
        if (this.flags.H == true) { flags |= H; }
        if (this.flags.N == true) { flags |= N; }
        if (this.flags.C == true) { flags |= C; }

        return flags & 0xFF;
    }

    // Asigna un nuevo estado a todos los flags a partir de su equivalente numerico
    public setFlags(flags: number) {
        const Z = 0x80; // 1000 0000
        const N = 0x40; // 0100 0000
        const H = 0x20; // 0010 0000
        const C = 0x10; // 0001 0000

        this.flags.Z = ((flags & Z) != 0);
        this.flags.H = ((flags & H) != 0);
        this.flags.N = ((flags & N) != 0);
        this.flags.C = ((flags & C) != 0);
    }

    // Obtiene el valor de un registro a partir de su nombre
    // Nombre del registro (A, B, C, D, E, SP, PC, HL, BC, DE, H, L, AF, F)
    public getReg(reg: string): number {
        let value = -1;
        switch (reg) {
            case "A": value = this.A; break;
            case "B": value = this.B; break;
            case "C": value = this.C; break;
            case "D": value = this.D; break;
            case "E": value = this.E; break;
            case "SP": value = this.SP; break;
            case "PC": value = this.PC; break;
            case "HL": value = this.HL; break;
            case "BC": value = this.BC; break;
            case "DE": value = this.DE; break;
            case "H": value = this.H; break;
            case "L": value = this.L; break;
            case "AF": value = this.AF; break;
            case "F": value = this.F; break;
        }
        return value;
    }

    //Asigna un valor a un registro identificado por su nombre
    // Nombre del registro (A, B, C, D, E, SP, PC, HL, BC, DE, H, L, AF, F)
    public setReg(reg: string, value: number) {
        switch (reg) {
            case "A": this.A = value; break;
            case "B": this.B = value; break;
            case "C": this.C = value; break;
            case "D": this.D = value; break;
            case "E": this.E = value; break;
            case "SP": this.SP = value; break;
            case "PC": this.PC = value; break;
            case "HL": this.HL = value; break;
            case "BC": this.BC = value; break;
            case "DE": this.DE = value; break;
            case "H": this.H = value; break;
            case "L": this.L = value; break;
            case "AF": this.AF = value; break;
            case "F": this.F = value; break;
        }
    }

    public reset() {
        // Estado inicial de los registros y flags
        this.flagIME = false;
        this.flagZ = true;
        this.flagN = false;
        this.flagH = true;
        this.flagC = true;
        this.A = 0x11;
        this.PC = 0x0100;
        this.SP = 0xFFFE;
        this.BC = 0x0013;
        this.DE = 0x00D8;
        this.HL = 0x014D;
    }

}