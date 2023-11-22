import {NAMESPACE} from "../main.js";
// import { * } from "@league-of-foundry-developers";

function staticImplements<T>() {
    return <U extends T>(constructor: U) => {
        constructor
    };
}

// @ts-ignore
@staticImplements<GamepadModule>()
export class CanvasZoomMove {

    public static defaultConfig: GamepadModuleConfig = {
        binding: {
            axes: {},
            buttons:{
                "zoom-in":{
                    index: "4",
                    label:"Zoom In"
                },
                "zoom-out":{
                    index: "5",
                    label:"Zoom Out"
                },                
            }
        },
        name: "Canvas Zoom & Move",
        id: "enox-canvas-zoom-move",
        desc: "beaversGamepad.macro.desc"
    }
    
    constructor(){
        this.initialize();
    }
    hook?: number;

    private X_AXES = "Move-horizontal";
    private Y_AXES = "Move-vertical";
    private CANVAS_PAN_HOOK = "canvasPan";

    private _data: {
        config: GamepadModuleConfig,
        userPosition: string
        userId: string,
        actorId?: string,
        canvasPosition?: CanvasPosition
    } = {
        config: CanvasZoomMove.defaultConfig,
        userPosition: "bottom",
        userId: "",
    }


    public initialize() {
        if(this.hook){
            Hooks.off(this.CANVAS_PAN_HOOK,this.hook);
        }
        this.hook = Hooks.on(this.CANVAS_PAN_HOOK,this._updateCanvasPosition.bind(this));
    }

    private _updateCanvasPosition(canvas, position){
        // console.log("updateCanvasPosition", position);
        this._data.canvasPosition = position;
    }

    public updateGamepadConfig(gamepadConfig: GamepadConfig) {
        this._data.config = CanvasZoomMove.defaultConfig;
        this._data.config.binding = gamepadConfig.modules[this._data.config.id].binding;
        const userData = game["beavers-gamepad"].Settings.getUserData(gamepadConfig.userId);
        this._data.userPosition = userData.userPosition;
        this._data.userId = gamepadConfig.userId;
        const user = (game as Game).users?.find(u=>u.id === gamepadConfig.userId);
        this._data.actorId = user?.character?.id!;
    }

    public getConfig(): GamepadModuleConfig {
        return this._data.config;
    }

    private getByButtonKey(obj, button): string | null  {
        for (const key in obj) {
          if (obj[key].index == button) {
            return key;
          }
        }
        return null
    }

    public tick(event: GamepadTickEvent): boolean {
        if(!event.hasAnyButtonTicked){
            return true;
        }
        const buttonKey = Object.keys(event.buttons)[0]
        const button = this.getByButtonKey(this._data.config.binding.buttons, buttonKey);
        
        if(button){
            console.log("button found", button);
            
            if(button=="zoom-in"){
                // @ts-ignore
                let zoomLevel = this._data.canvasPosition.scale + 0.1;
                // @ts-ignore
                console.log("zoomLevel", this._data.canvasPosition)
                // @ts-ignore
                canvas.animatePan({x:this._data.canvasPosition.x,y:this._data.canvasPosition?.y,scale:zoomLevel  });
            }
            if(button=="zoom-out"){
                // @ts-ignore
                let zoomLevel = this._data.canvasPosition.scale - 0.1;
                // @ts-ignore
                canvas.animatePan({x:this._data.canvasPosition.x,y:this._data.canvasPosition?.y,scale:zoomLevel  });
            }            
            
        }
        return true;
    }
    public destroy() {

    }
}