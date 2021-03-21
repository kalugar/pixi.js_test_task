import {Application, SCALE_MODES, settings, WRAP_MODES} from "pixi.js"
import { DataInit } from "../manager/data";
import Scene from "../scene";

const canvas = document.querySelector('#canvas'); 
const BASE_WIDTH = 1075
const BASE_HEIGHT = 767

export class App extends Application {
    constructor() {
        super({
            view:canvas,
            width:BASE_WIDTH,
            height: BASE_HEIGHT,
            backgroundColor: 0x223232,
            resolution: 2
        })
        settings.ANISOTROPIC_LEVEL=16
        settings.SCALE_MODE= SCALE_MODES.LINEAR
        settings.WRAP_MODE = WRAP_MODES.CLAMP

        window.app= this

        let interv = setInterval(()=>{
            if(!Scene.is_inited) return
            else {
                this.rz(window.isLand);
                clearInterval(interv);
            }
        },20)

        if(window.isLand=='uindefined'){} 
        else {
            window.addEventListener('resize',_=>this.rz(window.isLand));
            window.addEventListener('redraw',_=>{Scene.main.redraw(window.isLand)});
        }
        DataInit().then(()=>Scene.init(this.stage))
    }
    rz(land) {
       const width = this.view.parentNode.clientWidth
       const height = this.view.parentNode.clientHeight
       this.renderer.resize(width,height)
       const posX = (BASE_WIDTH-width)/2
       if (land) {
           Scene.main.position.set(0,0)
           Scene.main.width = width
           Scene.main.height = height
       } else {
        Scene.main.position.set(-posX,0)
        Scene.main.height = height
        Scene.main.width = BASE_WIDTH
       }
    }
}