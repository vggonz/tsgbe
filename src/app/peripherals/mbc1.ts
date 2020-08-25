import { Cartridge } from "./cartridge";

export class MBC1 extends Cartridge {

    // Determina si la zona de RAM esta habilitada
    private ramEnabled: boolean = false;
    // Banco de ROM que se encuentra actualmente proyectado
    private romPage: number = 1;
    /// Banco de RAM que se encuentra actualmente proyectado
    private ramPage: number = 0;
    // Determina si el cartucho tiene habilitado el modo de extension de RAM
    private mbcMode: number = 0;

    public constructor(data: Uint8Array) {
        super(data);
    }

    read(direction: number): number {
        let valor: number = 0;
        if (direction >= 0) {
            // Banco 0
            if (direction < 0x4000) valor = this.rom[direction];
            // Banco 1-n
            else if (direction < 0x8000) valor = this.rom[(direction - 0x4000) + (this.romPage * 0x4000)];
            // Banco 0-n de RAM
            else if (direction >= 0xA000 && direction < 0xC000 && this.ramEnabled) valor = this.ram[(direction - 0xA000) + (this.ramPage * 0x2000)];
        }
        return valor;

    }

    write(value: number, direction: number) {
        // 0-0x2000: RAM activada o desactivada
        if (direction < 0x2000) this.ramEnabled = (value & 0x0F) == 0x0A ? true : false;
        // 0x2000-0x4000: Seleccion de banco de ROM
        else if (direction < 0x4000) { this.romPage = (value & 0x1F); if (this.romPage == 0) this.romPage = 1; }
        else if (direction < 0x6000 && this.mbcMode == 1) this.ramPage = value & 0x03;
        else if (direction < 0x6000 && this.mbcMode == 0) this.romPage = (this.romPage & 0x07) | ((value & 0x03) << 3);
        else if (direction < 0x8000) this.mbcMode = value & 0x01;
        // RAM
        else if (direction >= 0xA000 && direction < 0xC000 && this.ramEnabled) this.ram[(direction - 0xA000) + (this.ramPage * 0x2000)] = value;
    }

}