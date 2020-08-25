import { Cartridge } from "./cartridge";

export class MBC0 extends Cartridge {

    public constructor(data: Uint8Array){
        super(data);
    }

    read(direction: number): number {
        return this.rom[direction];
    }

    write(value: number, direction: number) {
        // Not allowed in MBC0 type cartridges
    }

}