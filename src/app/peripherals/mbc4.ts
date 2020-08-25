import { Cartridge } from "./cartridge";

export class MBC4 extends Cartridge {

    public constructor(data: Uint8Array) {
        super(data);
    }

    read(direction: number): number {
        return 0;
    }

    write(value: number, direction: number) {
        // TODO
    }

}