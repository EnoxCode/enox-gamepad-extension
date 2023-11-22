import { MacroButtons } from "./gamepadModules/MacroButtons.js";	
import { CanvasZoomMove } from "./gamepadModules/CanvasZoomMove.js";
import { UserControl } from "./gamepadModules/UserControl.js";

export const NAMESPACE = "enox-gamepad-extension";
console.log("way cool");
Hooks.once('init', async function () {
	Hooks.call(NAMESPACE + ".init");
});
Hooks.on("ready", async function () {
	Hooks.call(NAMESPACE + ".ready");
	console.info({"Enox's Gamepad extensions ready"})
});

Hooks.on("beavers-gamepad.ready", async function (manager) {
	console.log("Beaver's Gamepad Ready! Registering modules");
	manager.registerGamepadModule(MacroButtons);
	manager.registerGamepadModule(CanvasZoomMove);
	manager.registerGamepadModule(UserControl);
});
