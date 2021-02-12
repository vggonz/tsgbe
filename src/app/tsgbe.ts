import { Cartridge } from "./peripherals/cartridge";
import { MBC0, MBC1, MBC2, MBC3, MBC4, MBC5 } from './peripherals';
import { GPU } from './kernel/gpu';
import { CPU } from './kernel/cpu';
import { RenderScreen } from './render';
import { Memory } from './kernel/memory';
import { Keypad } from './peripherals/keypad';
import { Constants } from './util/constants';

export class Main {

  private keypad: Keypad;
  private cartridge: Cartridge;
  private screen: RenderScreen;
  private cpu: CPU;
  private renderId: number;

  constructor(canvas: HTMLCanvasElement) {
    this.keypad = new Keypad();
    this.screen = new RenderScreen(canvas);
  }

  set palette(palette: number[]) { this.screen.setPalette(palette); }
  get keys() { return this.keypad; }
  
  loadData(data: Uint8Array): string{
    this.cartridge = this.loadCartridge(data);
    const memory = new Memory(this.cartridge, this.keypad);
    const gpu = new GPU(memory, this.screen);
    this.cpu = new CPU(memory, gpu);

    this.stop();
    this.cpu.reset();

    return this.cartridge.name;
  }

  start() {
    let lastLoopTime: number | null = null;
    const gameLoop = (loopTime: number) => {
      let deltaLoopTime: number | null = null;
      if (lastLoopTime != null) {
        deltaLoopTime = Math.min(loopTime - lastLoopTime, 1000 / 60);
      }

      if (deltaLoopTime) {
        let ticks = 0;

        while((ticks / (Constants.CPU_SPEED * 1000)) < deltaLoopTime){
          ticks += this.cpu.run();
        }
      }

      // Prepare for new frame
      lastLoopTime = loopTime;
      this.renderId = requestAnimationFrame(gameLoop);
    };

    // Start the game loop
    this.renderId = requestAnimationFrame(gameLoop);
  }

  stop() {
    cancelAnimationFrame(this.renderId);
  }

  private loadCartridge(data: Uint8Array) {
    let cartridge: Cartridge;

    switch (data[0x0147]) {
      case 0x00: cartridge = new MBC0(data); break; // ROM Only
      case 0x01: cartridge = new MBC1(data); break; // ROM + MBC1
      case 0x02: cartridge = new MBC1(data); break; // ROM + MBC1 + RAM
      case 0x03: cartridge = new MBC1(data); break; // ROM + MBC1 + RAM + BATTERY
      case 0x04:
      case 0x05: cartridge = new MBC2(data); break; // ROM + MBC2
      case 0x06: cartridge = new MBC2(data); break; // ROM + MBC2 + BATTERY
      case 0x07:
      case 0x08: cartridge = new MBC0(data); break; // ROM + RAM
      case 0x09: cartridge = new MBC0(data); break; // ROM + RAM + BATTERY
      case 0x0A:
      case 0x0B: cartridge = new MBC0(data); break; // ROM + MMM01
      case 0x0C: cartridge = new MBC0(data); break; // ROM + MMM01 + SRAM
      case 0x0D: cartridge = new MBC0(data); break; // ROM + MMM01 + SRAM + BATTERY
      case 0x0E:
      case 0x0F: cartridge = new MBC3(data); break; // ROM + MBC3 + TIMER + BATTERY
      case 0x10: cartridge = new MBC3(data); break; // ROM + MBC3 + TIMER + RAM + BATTERY
      case 0x11: cartridge = new MBC3(data); break; // ROM + MBC3
      case 0x12: cartridge = new MBC3(data); break; // ROM + MBC3 + RAM
      case 0x13: cartridge = new MBC3(data); break; // ROM + MBC3 + RAM + BATTERY
      case 0x14:
      case 0x15: cartridge = new MBC4(data); break; // ROM + MBC4
      case 0x16: cartridge = new MBC4(data); break; // ROM + MBC4 + RAM
      case 0x17: cartridge = new MBC4(data); break; // ROM + MBC4 + RAM + BATTERY
      case 0x18:
      case 0x19: cartridge = new MBC5(data); break; // ROM + MBC5
      case 0x1A: cartridge = new MBC5(data); break; // ROM + MBC5 + RAM
      case 0x1B: cartridge = new MBC5(data); break; // ROM + MBC5 + RAM + BATTERY
      case 0x1C: cartridge = new MBC5(data); break; // ROM + MBC5 + RUMBLE
      case 0x1D: cartridge = new MBC5(data); break; // ROM + MBC5 + RUMBLE + SRAM
      case 0x1E: cartridge = new MBC5(data); break; // ROM + MBC5 + RUMBLE + SRAM + BATTERY
      case 0x1F: cartridge = new MBC0(data); break; // POCKET CAMERA

      case 0xFD: cartridge = new MBC0(data); break; // BANDAI TAMA5
      case 0xFE: cartridge = new MBC3(data); break; // HUDSON HuC-3
      case 0xFF: cartridge = new MBC1(data); break; // HUDSON HuC-1

      default: throw new Error("[ERROR] Unknown cartridge type " + data[0x0147]);
    }

    if (data[0x143] == 0x80) throw new Error("GameBoy Color not supported");
    if (data[0x146] != 0x00) console.log("SuperGameBoy capabilities not supported");

    return cartridge;
  }

}