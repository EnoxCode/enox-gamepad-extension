import {NAMESPACE} from "../main.js";

function staticImplements<T>() {
    return <U extends T>(constructor: U) => {
        constructor
    };
}

// @ts-ignore
@staticImplements<GamepadModule>()
export class MacroButtons {

    public static defaultConfig: GamepadModuleConfig = {
        binding: {
            axes: {},
            buttons:{
                "gamepad-macro1":{
                    index: "1",
                    label:"Macro 1"
                },
                "gamepad-macro2":{
                    index: "0",
                    label:"Macro 2"
                },
                "gamepad-macro3":{
                    index: "6",
                    label:"Macro 3"
                },
                "gamepad-macro4":{
                    index: "7",
                    label:"Macro 4"
                }                
                 
            }
        },
        name: "Macrobuttons",
        id: "enox-macro-button",
        desc: "beaversGamepad.macro.desc"
    }

    //given the defaultConfig object and the index property is 1 what is the value of the label property?


    private _data: {
        config: GamepadModuleConfig,
        userPosition: string
        userId: string,
        actorId?: string,
    } = {
        config: MacroButtons.defaultConfig,
        userPosition: "bottom",
        userId: "",
    }


    public updateGamepadConfig(gamepadConfig: GamepadConfig) {
        this._data.config = MacroButtons.defaultConfig;
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
            // @ts-ignore
            (game as Game).macros.getName(button).execute();            
        }
        return true;
    }
    public destroy() {

    }
}