import 'regenerator-runtime/runtime';
import { Main } from './src/app/tsgbe';
import { Key } from './src/app/util/key';

let tsgbe;
const vibration = 5;

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('power') as HTMLElement;
    const fileInput = document.querySelector('#file-input') as HTMLElement;
    btn.addEventListener("click", (e: Event) => fileInput.click());
    fileInput.addEventListener('change', (e: Event) => openFile(e));

    document.querySelector('#up').addEventListener('mousedown', () => {
        window.navigator.vibrate(vibration);
        tsgbe.keys.keyDown(Key.Up);
    });
    document.querySelector('#up').addEventListener('mouseup', () => tsgbe.keys.keyUp(Key.Up));
    document.querySelector('#down').addEventListener('mousedown', () => {
        window.navigator.vibrate(vibration);
        tsgbe.keys.keyDown(Key.Down);
    });
    document.querySelector('#down').addEventListener('mouseup', () => tsgbe.keys.keyUp(Key.Down));
    document.querySelector('#left').addEventListener('mousedown', () => {
        window.navigator.vibrate(vibration);
        tsgbe.keys.keyDown(Key.Left);
    });
    document.querySelector('#left').addEventListener('mouseup', () => tsgbe.keys.keyUp(Key.Left));
    document.querySelector('#right').addEventListener('mousedown', () => {
        window.navigator.vibrate(vibration);
        tsgbe.keys.keyDown(Key.Right);
    });
    document.querySelector('#right').addEventListener('mouseup', () => tsgbe.keys.keyUp(Key.Right));
    document.querySelector('#start').addEventListener('mousedown', () => {
        window.navigator.vibrate(vibration);
        tsgbe.keys.keyDown(Key.Start);
    });
    document.querySelector('#start').addEventListener('mouseup', () => tsgbe.keys.keyUp(Key.Start));
    document.querySelector('#select').addEventListener('mousedown', () => {
        window.navigator.vibrate(vibration);
        tsgbe.keys.keyDown(Key.Select);
    });
    document.querySelector('#select').addEventListener('mouseup', () => tsgbe.keys.keyUp(Key.Select));
    document.querySelector('#btn-a').addEventListener('mousedown', () => {
        window.navigator.vibrate(vibration);
        tsgbe.keys.keyDown(Key.A);
    });
    document.querySelector('#btn-a').addEventListener('mouseup', () => tsgbe.keys.keyUp(Key.A));
    document.querySelector('#btn-b').addEventListener('mousedown', () => {
        window.navigator.vibrate(vibration);
        tsgbe.keys.keyDown(Key.B);
    });
    document.querySelector('#btn-b').addEventListener('mouseup', () => tsgbe.keys.keyUp(Key.B));

    tsgbe = new Main(<HTMLCanvasElement>document.getElementById('canvas'));
});

document.onkeydown = function (e) {
    switch (e.keyCode) {
        case 13: tsgbe.keys.keyDown(Key.Start); break;
        case 16: tsgbe.keys.keyDown(Key.Select); break;
        case 90: tsgbe.keys.keyDown(Key.A); break;
        case 88: tsgbe.keys.keyDown(Key.B); break;
        case 38: tsgbe.keys.keyDown(Key.Up); break;
        case 40: tsgbe.keys.keyDown(Key.Down); break;
        case 37: tsgbe.keys.keyDown(Key.Left); break;
        case 39: tsgbe.keys.keyDown(Key.Right); break;
    }
}

document.onkeyup = function (e) {
    switch (e.keyCode) {
        case 13: tsgbe.keys.keyUp(Key.Start); break;
        case 16: tsgbe.keys.keyUp(Key.Select); break;
        case 90: tsgbe.keys.keyUp(Key.A); break;
        case 88: tsgbe.keys.keyUp(Key.B); break;
        case 38: tsgbe.keys.keyUp(Key.Up); break;
        case 40: tsgbe.keys.keyUp(Key.Down); break;
        case 37: tsgbe.keys.keyUp(Key.Left); break;
        case 39: tsgbe.keys.keyUp(Key.Right); break;
    }
}

async function openFile(fileInputEvent: any) {
    if (fileInputEvent.target.files.length > 0) {
        let fileContent = await fileToByteArray(fileInputEvent.target.files[0]);
        const data = new Uint8Array(fileContent as ArrayBuffer);
        tsgbe.loadData(data);
        tsgbe.start();
        console.log(tsgbe.name);
    }
}

function fileToByteArray(file: any) {
    return new Promise<string | ArrayBuffer>((resolve, reject) => {
        try {
            let reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = function () {
                resolve(reader.result);
            }
        }
        catch (e) {
            reject(e);
        }
    });
}
