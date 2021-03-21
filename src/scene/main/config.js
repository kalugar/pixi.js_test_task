export default {
 landscape: {
    mask:{width:1075,height:767},
    doggy: [
        {x:214,y:174, scaleX:-1,scaleY:1},
        {x:596,y:234, scaleX:-1,scaleY:1},
        {x:178,y:538, scaleX:1,scaleY:1},
        {x:900,y:163, scaleX:1,scaleY:1},
        {x:918,y:496, scaleX:1,scaleY:1}
    ],
    circle:[
    {x:214+40,y:174-10, scaleX:-1,scaleY:1},
    {x:596+40,y:234-10, scaleX:-1,scaleY:1},
    {x:178+144,y:538-10, scaleX:-1,scaleY:1},
    {x:900+144,y:163-10, scaleX:-1,scaleY:1},
    {x:918+144,y:496-10, scaleX:-1,scaleY:1}
    ],
    maiden:{x:130,y:430,scaleX:0.75,scaleY:0.8},


    text1: {
        pos:[0,0],
        value: "5 Hidden Dogs\nCan you spot them?",
        textStyle: {
            fontFamily : 'Arial', 
            fontSize: 56,
            fontWeight:600, 
            fill: 0xffffff,
            align : 'center'
            }
    },
    text2: {
        pos:[0,0],
        value: "Can you solve\nevery mystery?",
        textStyle: {
            fontFamily : 'Arial', 
            fontSize: 72,
            fontWeight:600, 
            fill: 0xffffff,
            align : 'center'
            }
    },

 },
 portrait:{
    mask:{width:767,height:1075},
    doggy: [
        {x:542,y:162, scaleX:-1*0.7,scaleY:0.7},
        {x:470,y:404, scaleX:1*0.75,scaleY:0.75},
        {x:668,y:334, scaleX:1*0.6,scaleY:0.6},
        {x:670,y:506, scaleX:1*0.85,scaleY:0.85},
        {x:776,y:210, scaleX:1*0.5,scaleY:0.5}
    ],
    circle:[
        {x:566,y:162-10, scaleX:-1*0.7,scaleY:0.7},
        {x:566,y:404-10, scaleX:-1*0.75,scaleY:0.75},
        {x:744,y:334-10, scaleX:-1*0.6,scaleY:0.6},
        {x:782,y:506-10, scaleX:-1*0.85,scaleY:0.85},
        {x:844,y:210-10, scaleX:-1*0.5,scaleY:0.5}
     ],
    maiden:{x:528,y:438,scaleX:-0.55,scaleY:0.5},

    text1: {
        pos:[0,0],
        value: "5 Hidden Dogs\nCan you spot them?",
        textStyle: {
            fontFamily : 'Arial', 
            fontSize: 56,
            fontWeight:600,
            fill: 0xffffff,
            align : 'center'
            }
    },
    text2: {
        pos:[0,0],
        value: "Can you solve\nevery mystery?",
        textStyle: {
            fontFamily : 'Arial', 
            fontSize: 72,
            fontWeight:600,
            fill: 0xffffff,
            align : 'center'
            }
    },
    
 }
}