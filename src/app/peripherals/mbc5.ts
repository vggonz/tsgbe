import { Cartridge } from "./cartridge";

export class MBC5 extends Cartridge {

    // Determina si la zona de RAM esta habilitada
    private ramEnabled: boolean = false;
    // Banco de ROM que se encuentra actualmente proyectado
    private romPage: number = 1;
    // Banco de RAM que se encuentra actualmente proyectado
    private ramPage: number = 0;

    public constructor(data: Uint8Array) {
        super(data);
    }

    read(direction: number): number {
        let value: number = 0;
        if (direction >= 0) {
            // Banco 0
            if (direction < 0x4000) value = this.rom[direction];
            // Banco 1-n
            else if (direction < 0x8000) value = this.rom[(direction - 0x4000) + (this.romPage * 0x4000)];
            // Banco 0-n de RAM
            else if (direction >= 0xA000 && direction < 0xC000 && this.ramEnabled) value = this.ram[(direction - 0xA000) + (this.ramPage * 0x2000)];
        }
        return value;
    }

    write(value: number, direction: number) {
        // 0-0x2000: Activa a desctiva la RAM
        if (direction < 0x2000) this.ramEnabled = (value & 0x0F) == 0x0A ? true : false;
        // 0x2000-0x3000: Seleccion parte baja del banco de ROM
        else if (direction < 0x3000) this.romPage = (this.romPage & 0x100) | (value & 0xFF);
        // 0x3000-0x4000: Seleccion parte alta del banco de ROM
        else if (direction < 0x4000) this.romPage |= ((value & 0x01) << 8);
        // 0x4000-0x6000: Seleccion banco de RAM
        else if (direction < 0x6000) this.ramPage = value & 0x0F;
        // RAM
        else if (direction >= 0xA000 && direction < 0xC000 && this.ramEnabled) this.ram[(direction - 0xA000) + (this.ramPage * 0x2000)] = value;
    }

}