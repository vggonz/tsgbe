import { Key } from '../util/key';

export class Keypad {

    // Estado actual de las teclas
    //              Down,  Up,    Left,  Right, Start, Select, B,    A
    public keys = [false, false, false, false, false, false, false, false];

    // Invierte el estado de una tecla
    public toggleKey(key: Key) { this.keys[key] = !this.keys[key]; }

    // Registra la pulsacion de una tecla
    public keyDown(key: Key) {
        this.keys[key] = true;
    }

    // Registra la liberacion de una tecla pulsada previamente
    public keyUp(key: Key) {
        this.keys[key] = false;
    }

}