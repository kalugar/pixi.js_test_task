import{Container,Sprite,AnimatedSprite,Graphics,Texture} from 'pixi.js'
import Data from '../../manager/data';
import config from './config';
import InfoPage from './infopages';

/**
 * window.PIXI - для дебагга из devtools
 */
import * as PIXI from "pixi.js"
window.PIXI=PIXI

export default class MainScene extends Container {
    constructor() {
        super();
        this.dogs = []
        this.circles = []

        this.winArray=[]

            this.cfg = window.isLand ?config.landscape:config.portrait
           
            this.bg = this.addChild(new Sprite.from(Data.bg))
            this.animation = animation()
        
            for (let i =0; i<5;i++) {
                this.dogs[i]=this.addChild(new Sprite.from(Data.doggy))
                this.dogs[i].alpha=0.9
                this.dogs[i].position.set(this.cfg.doggy[i].x,this.cfg.doggy[i].y)
                this.dogs[i].scale={x:this.cfg.doggy[i].scaleX,y:this.cfg.doggy[i].scaleY}
    
                this.circles[i] = this.addChild( new AnimatedSprite(this.animation))
                this.circles[i].position.set(this.cfg.circle[i].x,this.cfg.circle[i].y)
                this.circles[i].scale={x:this.cfg.circle[i].scaleX,y:this.cfg.circle[i].scaleY}
                this.circles[i].animationSpeed = 0.25
                this.circles[i].loop = false
                this.circles[i].alpha = 0
            }
            this.info = this.addChild(new InfoPage());
            
            this.start()
    } 
    start() {
        this.info.fade()
    }

    /**
     * @param {boolean} enable  - true/false - activates/deactivates interactive mode
     */
    btnMode(enable) {
        this.dogs.forEach((dog, id)=> {
            dog.interactive=enable
            dog.btnMode=enable
            enable&&dog.on('pointertap', _=>this.markDog(id))||{}
        })
    }

    /**
     * @param {number} id  - doggy id
     */
    markDog(id){
        if(this.winArray.includes(id)) {console.log('Dog has already been found!');return}
        this.circles[id].alpha=1
        this.circles[id].gotoAndPlay(0)
        this.circles[id].onComplete = ()=>{
            this.winArray.push(id)
            if(this.winArray.length===this.circles.length){
                this.info.winAnimation()
            } else {this.circles[id].onComplete=undefined;return}
        }
    }

 
    /**
     * @param {boolean} lan  - window.isLand - orintation trigger
     */
    redraw(lan) {
        let cfg = lan?config.landscape:config.portrait
        for (let i = 0; i<5;i++) {
            this.dogs[i].position.set(cfg.doggy[i].x,cfg.doggy[i].y)
            this.dogs[i].scale={x:cfg.doggy[i].scaleX,y:cfg.doggy[i].scaleY}
            this.circles[i].position.set(cfg.circle[i].x,cfg.circle[i].y)
            this.circles[i].scale={x:cfg.circle[i].scaleX,y:cfg.circle[i].scaleY}
        }

        this.info.winCont.maiden.position.set(cfg.maiden.x,cfg.maiden.y)
        this.info.winCont.maiden.scale = {x:cfg.maiden.scaleX,y:cfg.maiden.scaleY}
    }
}


/**
 * @returns Array of textures
 */
const animation = () => {
    let anima = []
    for(let key in Data) {
        let frame = key.match(/circle_/)
        if(frame) {
            let texture = new Texture.from(Data[key])
            anima.push(texture)
        }
    }
    return anima
}