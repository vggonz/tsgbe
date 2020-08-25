import { Memory } from "./memory";
import { Constants } from "../util/constants";
import { RenderScreen } from "../render";

export class GPU {

    private memory: Memory;
    private screen: RenderScreen;
    private buffers: Uint8Array[];
    private currentBuffer: number;

    constructor(memory: Memory, screen: RenderScreen) {
        this.memory = memory;
        this.screen = screen;
        this.buffers = [
            new Uint8Array(Constants.SCREEN_WIDTH * Constants.SCREEN_HEIGHT),
            new Uint8Array(Constants.SCREEN_WIDTH * Constants.SCREEN_HEIGHT),
        ];
        this.currentBuffer = 0;
    }

    hblank() {
        const scanLine: number = (this.memory.read(Constants.LCD_Y_LOC) & 0xFF);
        this.updateBackground(scanLine);
        this.updateWindow(scanLine);
        this.updateSprites(scanLine);
    }

    /// <summary>Actualiza el fondo de la pantalla de una linea concreta</summary>
    /// <param name="scanLine">Linea a actualizar</param>
    private updateBackground(scanLine: number) {
        // Solo dibuja las lineas visibles (0-144)
        if (((this.memory.read(Constants.LCD_CTRL) & 0x01) != 0) && scanLine < 144) {
            const mapAddress = (this.memory.read(Constants.LCD_CTRL) & 0x08) != 0 ? 0x9C00 : 0x9800; // BG Tile Map Display Select
            const tileAddress = (this.memory.read(Constants.LCD_CTRL) & 0x10) != 0 ? 0x8000 : 0x8800; // BG & Window Tile Data Select

            let scrollX = this.memory.read(Constants.LCD_SCROLL_X);
            let scrollY = this.memory.read(Constants.LCD_SCROLL_Y);

            // La linea tiene 160 pixeles de ancho
            for (let x = 0; x < 160; x++) {
                if ((scrollY + scanLine) > 255) scrollY -= 255;
                if ((scrollX + x) > 255) scrollX -= 255;

                // Tile
                const xTile = (scrollX + x) >> 3;
                const yTile = (scrollY + scanLine) >> 3;
                // Pixel dentro del tile
                const bitX = (scrollX + x) & 0x07;
                const bitY = (scrollY + scanLine) & 0x07;

                const idTile = this.getIdTile(xTile, yTile, mapAddress, tileAddress);
                const tile = this.getTile(idTile, tileAddress, bitX, bitY);
                this.drawPixel(x, scanLine, this.id2color(tile, Constants.LCD_BACK_PALETTE));
            }
        }
    }


    /// <summary>Actualiza la ventana de una linea concreta</summary>
    /// <remarks>La ventana es como otro fondo superpuesto al anterior, pero colocado en una posicion determinada
    /// de la pantalla. Usa los mismos tiles que el fondo</remarks>
    /// <param name="scanLine">Linea a actualizar</param>
    private updateWindow(scanLine: number) {
        const winY = this.memory.read(Constants.LCD_WIN_Y);

        if (((this.memory.read(Constants.LCD_CTRL) & 0x20) != 0) && winY <= scanLine) {

            const winX = this.memory.read(Constants.LCD_WIN_X) - 7;
            const mapAddress = (this.memory.read(Constants.LCD_CTRL) & 0x40) != 0 ? 0x9C00 : 0x9800;
            const tileAddress = (this.memory.read(Constants.LCD_CTRL) & 0x10) != 0 ? 0x8000 : 0x8800;

            for (let wx = 0; wx < (160 - winX); wx++) {
                const xTile = wx >> 3;
                const yTile = (scanLine - winY) >> 3;

                const bitX = wx & 0x07;
                const bitY = (scanLine - winY) & 0x07;

                const idTile = this.getIdTile(xTile, yTile, mapAddress, tileAddress);
                const tile = this.getTile(idTile, tileAddress, bitX, bitY);
                if ((wx + winX) < 160 && (wx + winX) >= 0) {
                    this.drawPixel(wx + winX, scanLine, this.id2color(tile, Constants.LCD_BACK_PALETTE));
                }
            }
        }
    }

    /// <summary>Actualiza los sprites que aparecen en una linea de la pantalla</summary>
    /// <param name="scanLine">Linea a actualizar</param>
    private updateSprites(scanLine: number) {
        if ((this.memory.read(Constants.LCD_CTRL) & 0x02) != 0) {

            // Los sprites pueden ser de 8x8 o 8x16 pixeles 
            const spriteSize = (this.memory.read(Constants.LCD_CTRL) & 0x04) != 0 ? 16 : 8;
            // El sprite 0 es el de menor prioridad
            for (let i = 39; i >= 0; i--) {
                const spriteY = this.memory.read(0xFE00 + (i * 4));
                const spriteX = this.memory.read(0xFE01 + (i * 4));

                if ((spriteY <= scanLine + 16) && (spriteY > scanLine + (16 - spriteSize))) {
                    const tileNum = this.memory.read(0xFE02 + (i * 4));
                    const attributes = this.memory.read(0xFE03 + (i * 4));

                    // Paleta a utilizar
                    const pal: boolean = (attributes & 0x10) == 0x10;
                    // Inversion horizontal
                    const flipX: boolean = (attributes & 0x20) == 0x20;
                    // Inversion vertical
                    const flipY: boolean = (attributes & 0x40) == 0x40;
                    // Prioridad sobre el fondo/ventana
                    const priority: boolean = (attributes & 0x80) == 0x80;

                    // Todos los sprites tiene 8 pixeles de ancho
                    for (let j = 0; j < 8; j++) {
                        const posX = flipX ? spriteX - 1 - j : spriteX + j - 8;
                        const posY = flipY ? spriteSize - (scanLine - spriteY + 17) : scanLine - spriteY + 16;
                        const tile = this.getTile(tileNum, 0x8000, j, posY);
                        if (posX >= 0 && tile != 0 && (!priority || (priority && this.getIdColor(posX, scanLine) == 0))) {
                            this.drawPixel(posX, scanLine, this.id2color(tile, pal ? Constants.LCD_SPR1_PALETTE : Constants.LCD_SPR0_PALETTE));
                        }
                    }
                }
            }
        }
    }

    vblank() {
        this.screen.refresh(this.buffers[this.currentBuffer]);
        this.currentBuffer = ~this.currentBuffer & 1;
    }

    private drawPixel(posx: number, posy: number, id_color: number) {
        this.buffers[this.currentBuffer][(posy * Constants.SCREEN_WIDTH) + posx] = id_color;
    }

    /// <summary>Obtiene el identificador de color del fondo/ventana en una posicion concreta</summary>
    /// <param name="x">Posicion X de la pantalla</param>
    /// <param name="y">Posicion Y de la pantalla</param>
    /// <returns>El identificador de color</returns>
    private getIdColor(x: number, y: number): number {
        const mapAddress = (this.memory.read(Constants.LCD_CTRL) & 0x08) != 0 ? 0x9C00 : 0x9800;
        const tileAddress = (this.memory.read(Constants.LCD_CTRL) & 0x10) != 0 ? 0x8000 : 0x8800;
        let scrollX = this.memory.read(Constants.LCD_SCROLL_X);
        let scrollY = this.memory.read(Constants.LCD_SCROLL_Y);

        if ((scrollY + y) > 255) scrollY -= 255;
        if ((scrollX + x) > 255) scrollX -= 255;

        const idTile = this.getIdTile((scrollX + x) >> 3, (scrollY + y) >> 3, mapAddress, tileAddress);
        const tile = this.getTile(idTile, tileAddress, (scrollX + x) & 0x07, (scrollY + y) & 0x07);
        return tile;
    }

    /// <summary>Transforma un identificador de color en su color real usando una paleta de colores</summary>
    /// <param name="id">Identificador de color (0-3)</param>
    /// <param name="direccion">Direccion de memoria donde se encuentra la paleta de colores</param>
    /// <returns>El color correspondiente al identificador de color</returns>
    private id2color(id: number, direccion: number): number {
        // 11 10 01 00
        const valor = this.memory.read(direccion);
        const color = (valor & (0x03 << (id * 2))) >> (id * 2);
        return color;
    }

    /// <summary>Obtiene el numero de tile correspondiente a una posicion de la pantalla</summary>
    /// <remarks>La pantalla esta dividida en tiles de 8x8 pixeles. La ubicacion de los sprites es necesaria
    /// porque si estan en la direccion 0x8000 su identificador del mapa tiene signo</remarks>
    /// <param name="xTile">Tile horizontal</param>
    /// <param name="yTile">Tile vertical</param>
    /// <param name="mapAddress">Direccion del mapa de colocacion de tiles</param>
    /// <param name="tileAddress">Direccion de los datos de los sprites</param>
    /// <returns>El identificador de tile</returns>
    private getIdTile(xTile: number, yTile: number, mapAddress: number, tileAddress: number): number {
        let idTile = this.memory.read(mapAddress + (yTile << 5) + xTile);
        if (tileAddress != 0x8000) idTile ^= 0x80;
        return idTile;
    }

    /// <summary>Obtiene el valor del color de un pixel de un tile en concreto</summary>
    /// <param name="idTile">Identificador de tile</param>
    /// <param name="tileAddress">Direccion de memoria donde se encuentran todos los tiles</param>
    /// <param name="bitX">Posicion X del pixel dentro del tile</param>
    /// <param name="bitY">Posicion Y del pixel dentro del tile</param>
    private getTile(idTile: number, tileAddress: number, bitX: number, bitY: number): number {
        // El color de un pixel esta compuesto por dos bits (4 colores, blanco, negro y dos niveles de gris)
        const a = ((this.memory.read(tileAddress + 1 + (bitY << 1) + (idTile << 4)) >> (7 - bitX)) & 0x01) << 1;
        const b = (this.memory.read(tileAddress + (bitY << 1) + (idTile << 4)) >> (7 - bitX)) & 0x01;
        return a | b;
    }


}