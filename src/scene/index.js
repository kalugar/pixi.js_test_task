import MainScene from "./main"

function initialization(stage) {
    Scene.main = new MainScene();
    stage.addChild(Scene.main)
    Scene.is_inited=true
}

const Scene = {
    init: initialization,
    main: null,
    is_inited:false
}

export default Scene