import 'regenerator-runtime/runtime';
import { Main } from './src/app/tsgbe';
import { Key } from './src/app/util/key';

let tsgbe: Main;
const vibration = 1;

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('power') as HTMLElement;
    const fileInput = document.querySelector('#file-input') as HTMLElement;
    btn.addEventListener("click", (e: Event) => fileInput.click());
    fileInput.addEventListener('change', (e: Event) => openFile(e));

    function keyUp(key: Key){
      return () => tsgbe.keys.keyUp(key);
    }

    function keyDown(key: Key){
      return () => {
        window.navigator.vibrate(vibration);
        tsgbe.keys.keyDown(key);
      }
    }

    function bindButton(id: string, key: Key){
      document.querySelector(id).addEventListener('touchstart', keyDown(key));
      document.querySelector(id).addEventListener('touchend', keyUp(key));
      document.querySelector(id).addEventListener('mousedown', keyDown(key));
      document.querySelector(id).addEventListener('mouseup', keyUp(key));
    }

    bindButton('#up', Key.Up);
    bindButton('#down', Key.Down);
    bindButton('#left', Key.Left);
    bindButton('#right', Key.Right);
    bindButton('#start', Key.Start);
    bindButton('#select', Key.Select);
    bindButton('#btn-a', Key.A);
    bindButton('#btn-b', Key.B);
    
    tsgbe = new Main(<HTMLCanvasElement>document.getElementById('canvas'));
});

/*
  13: Enter
  16: Shift
  90: Z
  88: X
  38: Up arrow
  40: Down arrow
  37: Left arrow
  39: Right arrow
*/
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
        const fileContent = await fileToByteArray(fileInputEvent.target.files[0]);
        const name = tsgbe.loadData(new Uint8Array(fileContent as ArrayBuffer));
        console.log(name);
        tsgbe.start();
    }
}

function fileToByteArray(file: any) {
    return new Promise<string | ArrayBuffer>((resolve, reject) => {
        try {
            const reader = new FileReader();
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
