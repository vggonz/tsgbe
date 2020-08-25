import { Constants } from './util/constants';

export class RenderScreen {

    private buffer: Uint8ClampedArray;
    private image: ImageData;
    private canvasContext: CanvasRenderingContext2D | null;
    private palette: number[];

    constructor(canvas: HTMLCanvasElement) {
        this.canvasContext = canvas.getContext('2d');
        if (this.canvasContext) {
            this.canvasContext.canvas.width = Constants.SCREEN_WIDTH;
            this.canvasContext.canvas.height = Constants.SCREEN_HEIGHT;
            this.canvasContext.imageSmoothingEnabled = false;
        }

        this.buffer = new Uint8ClampedArray(4 * Constants.SCREEN_HEIGHT * Constants.SCREEN_WIDTH);
        this.image = new ImageData(this.buffer, Constants.SCREEN_WIDTH, Constants.SCREEN_HEIGHT);
        this.palette = Constants.DMG_COLORS;
    }

    setPalette(palette: number[]) {
        this.palette = palette;
    }

    /// <summary>Actualiza la pantalla dibujando el frame que tiene actualmente en el buffer</summary>
    refresh(buffer: Uint8Array) {
        for (let line = 0; line < Constants.SCREEN_HEIGHT; line++) {
            for (let column = 0; column < Constants.SCREEN_WIDTH; column++) {
                const startIndex = (line * Constants.SCREEN_WIDTH * 4) + (column * 4);
                const color = this.palette[buffer[(line * Constants.SCREEN_WIDTH) + column]];
                this.buffer[startIndex] = (color & 0xFF0000) >> 16;
                this.buffer[startIndex + 1] = (color & 0x00FF00) >> 8;
                this.buffer[startIndex + 2] = color & 0xFF;
                this.buffer[startIndex + 3] = 255;
            }
        }

        createImageBitmap(this.image).then(bitmap => {
            if (this.canvasContext) {
                this.canvasContext.drawImage(
                    bitmap,
                    0,
                    0,
                    Constants.SCREEN_WIDTH,
                    Constants.SCREEN_HEIGHT
                );
            }
        });
    }

}