import { Container,Graphics, Sprite, Text} from "pixi.js";
import Scene from "..";
import Data from "../../manager/data";
import config from "./config";

export default class InfoPage extends Container {
    constructor() {
        super();
        this.cfg = window.isLand ?config.landscape:config.portrait
        
        this.fadeRect = this.addChild(new Graphics())
        this.fadeRect.beginFill(0x000000)
        .drawRect(0,0,1075,767)
        .endFill()
        this.fadeRect.alpha=0
        this.width=this.fadeRect.width
        this.height=this.fadeRect.height

        this.text = this.addChild(new Text(this.cfg.text1.value, this.cfg.text1.textStyle))
        this.text.position.set(window.app.screen.width/2,window.app.screen.height/2)
        this.text.anchor.set(.5)
        this.text.alpha=0
        this.text.addChild(this.text.doggy = new Sprite.from(Data.doggy))

        this.text.doggy.scale.x=-1
        this.text.doggy.position.set(290, -140)
        

        this.winCont= this.addChild(new Container())
        this.winCont.alpha=0
        this.winCont.addChild(
            this.winCont.maiden= new Sprite.from(Data.char),
            this.winCont.label= new Sprite.from(Data.logo),
            this.winCont.gJob= new Text("Great Job",{fontFamily : 'Arial', fontSize: 128, fill : 0xffd700, fontWeight:600, align : 'center'}),
            this.winCont.text= new Text(this.cfg.text2.value, this.cfg.text2.textStyle)
            )
        this.winCont.children.forEach(child=>{
            child.anchor.set(.5)
            child.position.set(window.app.screen.width/2,window.app.screen.height/2)
        })
        this.winCont.label.y = 0+120
        this.winCont.text.y += window.app.screen.height/5
        this.winCont.maiden.position.set(this.cfg.maiden.x,this.cfg.maiden.y)
        this.winCont.maiden.scale={x:this.cfg.maiden.scaleX,y:this.cfg.maiden.scaleY}

        this.btn = this.addChild(new Text("")) // new Text - потому что обладает свойствами контейнера и спрайта
        this.btn.interactive=true
        this.btn.btnMode=true
        this.btn.on("pointertap",_=>window.location = 'https://www.g5e.com/')
        this.btn.position.set(window.app.screen.width/2, window.app.screen.height-80)
        this.btn.anchor.set(.5)
        this.btn.addChild(
            this.btn.bg = new Sprite.from(Data.btn),
            this.btn.tx = new Text("Play Now",{fontFamily : 'Arial', fontSize: 42, fill : 0xfffacd, fontWeight:600, align : 'center'})
            )
        this.btn.children.forEach(child=>child.anchor.set(.5))
        this.btn.tx.y-=5

        /**
         * накладываем маску для решения overload_screen
         */
        const mask =new Graphics()
        mask.beginFill(0x7f7f80)
            .drawRect(0,0,window.app.screen.width,window.app.screen.height)
            .endFill()
        this.mask=mask
        this.addChild(mask)

    }

    fade() {
        let fade_state = "in"
        const timer = setTimeout(()=>{fade_state = "out";clearTimeout(timer)},5000)
        let interv1 = setInterval(()=>{
            if(fade_state==="in") {
                if (this.fadeRect.alpha >=0.8) {}
                else this._fade(fade_state)
            } else {
                clearInterval(interv1)
                clearInterval(interv2)
                interv1 = setInterval(()=>{
                    if(this.fadeRect.alpha <=0) {
                        clearInterval(interv1)
                        /**
                         * при необходимости сделать ресет на alpha, scales, positions
                         */
                        Scene.main.btnMode(true)
                        return
                    } else this._fade(fade_state)
                },75)
            }
        },75)

        const interv2 = setInterval(()=>{
                this.text.scale.x+=.001
                this.text.scale.y+=.001
        },50)
    }

    /**
     * @param {string} state  - состояние анимации
     */
    _fade(state) {
        switch (state) {
            case "in":
                this.fadeRect.alpha+=0.05
                this.text.alpha+=.05
                break;
            case "out":
                this.fadeRect.alpha-=0.05
                this.text.alpha-=.05
                break;
        }
    }

    btnAnimation() {
        let state = 'up'
        let interv = setInterval(()=>{
            if(this.btn.scale.x<=1.02&&state==='up'){
                this.btn.scale.x+=0.001
                this.btn.scale.y+=0.001
                if(this.btn.scale.x>=1.020)state ="down"
            } else if(this.btn.scale.x>1&&state==='down'){
                this.btn.scale.x-=0.001
                this.btn.scale.y-=0.001
                if(this.btn.scale.x<=1.001)state ="up"
            }
        },50)
    }

    winAnimation() {
        if(this.fadeRect.alpha!==0)this.fadeRect.alpha=0
        this.btnAnimation()
        let interv = setInterval(() =>{
            if (this.fadeRect.alpha >=0.8){
                this.winCont.alpha=1
                clearInterval(interv)
                return
            }else {
                this.fadeRect.alpha+=.05
                this.winCont.alpha+=.05
            }
        },75)
    }
}