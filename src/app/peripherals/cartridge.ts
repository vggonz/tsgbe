export abstract class Cartridge {

    public name: string;
    protected romChunks: number;
    protected ramChunks: number;
    protected rom: Uint8Array;
    protected ram: Uint8Array;

    constructor(data: Uint8Array) {
        this.load(data);
        if (!this.checksum()) {
            console.error('[ERROR] Invalid checksum!');
        }
    }

    abstract read(direction: number): number;
    abstract write(value: number, direction: number): void;

    private load(data: Uint8Array) {
        // Primero carga los primeros 16 Kb (tamanyo minimo) para conocer el tamanyo real del cartucho
        this.rom = data;
        switch (this.rom[0x0148]) {
            case 0: this.romChunks = 2; break;
            case 1: this.romChunks = 4; break;
            case 2: this.romChunks = 8; break;
            case 3: this.romChunks = 16; break;
            case 4: this.romChunks = 32; break;
            case 5: this.romChunks = 64; break;
            case 6: this.romChunks = 128; break;
            case 0x52: this.romChunks = 72; break;
            case 0x53: this.romChunks = 80; break;
            case 0x54: this.romChunks = 96; break;
            default: this.romChunks = 0; break;
        }

        switch (this.rom[0x149]) {
            case 0: this.ramChunks = 0; break;
            case 1: this.ramChunks = 1; break;
            case 2: this.ramChunks = 1; break;
            case 3: this.ramChunks = 4; break;
            case 4: this.ramChunks = 16; break;
            case 5: this.ramChunks = 32; break;
            default: this.ramChunks = 0; break;
        }
        this.ram = new Uint8Array(0x2000 * this.ramChunks);
        // Lee el nombre interno de la ROM
        this.name = '';
        for (let i = 0x134; i <= 0x142; i++) {
            if (this.rom[i]) {
                this.name += String.fromCharCode(this.rom[i]);
            }
        }
    }

    private checksum(): boolean {
        // El resultado del checksum son 2 bytes
        const checksum = (this.rom[0x14E] << 8) + this.rom[0x14F];
        let total = 0;
        // Se suman todos los bytes de la rom a excepcion de los del resultado
        for (let i = 0; i < this.rom.length; i++) {
            if (i != 0x14E && i != 0x14F) {
                total = (total + this.rom[i]) & 0x0000FFFF;
            }
        }
        return checksum == total;
    }

}