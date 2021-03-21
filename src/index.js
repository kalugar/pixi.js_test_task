import { utils } from 'pixi.js';
import 'style';
import {App} from "./class/App"

document.oncontextmenu = _ => false;
utils.skipHello()

const orient  = window.matchMedia("(orientation: landscape)");
window.isLand = orient.matches;
orient.addEventListener('change', _=>{
    window.isLand = orient.matches
    const redraw = new Event("redraw")
    window.dispatchEvent(redraw)
    return window.isLand
});

new App();