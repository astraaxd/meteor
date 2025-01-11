//========================================================== MODS ==========================================================
//========================================================== MODS ==========================================================
//========================================================== MODS ==========================================================
//========================================================== MODS ==========================================================
//========================================================== MODS ==========================================================
//========================================================== MODS ==========================================================
//========================================================== MODS ==========================================================

function forcePatch(obj, shouldEqual) {
    for (let prop in obj) {
      if (typeof obj[prop] === 'function') {
        const originalMethod = obj[prop];
        obj[prop] = function() {
          return shouldEqual;
        };
      }
    }
    const handler = {
      get(target, prop, receiver) {
        if (typeof target[prop] === 'function') {
          return function() {
            return shouldEqual;
          };
        }
        return Reflect.get(...arguments);
      }
    };
    obj = new Proxy(obj, handler);
    for (let prop in obj) {
      if (typeof obj[prop] === 'function') {
        Object.defineProperty(obj, prop, {
          get: function() {
            return shouldEqual;
          }
        });
      }
    }
  
    return obj;
}

/*class ESP {
    constructor() {
        this.buttonText = "ESP";
        this.isActive = false;
        this.updateInterval = null;
        this.debugBoundingBoxHandler = null;
    }

    onButtonEnable() {
        this.updateInterval = setInterval(() => {
            if (this.isActive) {
                this.onModUpdate();
            }
        }, 1);
        this.onEnabled();
    }

    onButtonDisable() {
        clearInterval(this.updateInterval);
        this.updateInterval = null;
        this.onDisabled();
    }

    onModUpdate() {
        this.onUpdate();
    }




    onUpdate() {
        if (ModAPI.mc.renderManager != null) {
            ModAPI.mc.renderManager.debugBoundingBox = 1;
        }
    }

    onEnabled() {
        this.debugBoundingBoxHandler = new DebugBoundingBoxHandler();
        if (ModAPI.mc.renderManager) {
            ModAPI.mc.renderManager.debugBoundingBox = 1;
        }
    }

    onDisabled() {
        this.debugBoundingBoxHandler = new DebugBoundingBoxHandler();
        if (ModAPI.mc.renderManager) {
            ModAPI.mc.renderManager.debugBoundingBox = 0;
        }
    }
}

    let worldRenderer = ModAPI.reflect
    .getClassById("net.minecraft.client.renderer.Tessellator")
    .staticMethods.getInstance.method().$worldRenderer;

let tessellatorInstance = ModAPI.reflect
    .getClassById("net.minecraft.client.renderer.Tessellator")
    .staticMethods.getInstance.method();

let originalRenderBoundingBox = ModAPI.hooks.methods.nmcre_RenderManager_renderDebugBoundingBox;
class DebugBoundingBoxHandler {
    constructor() {
        if (this.isModEnabled()) {
            ModAPI.hooks.methods.nmcre_RenderManager_renderDebugBoundingBox = function (...args) {
                ModAPI.hooks.methods.nlevo_GlStateManager_disableDepth();
                originalRenderBoundingBox.apply(this, args);
                ModAPI.hooks.methods.nlevo_GlStateManager_enableDepth();
            };
        } else {
            ModAPI.hooks.methods.nmcre_RenderManager_renderDebugBoundingBox = originalRenderBoundingBox;
        }
    }

    static onClick() {
        tessellatorInstance.remove();
    }

    isModEnabled() {
        return this.isActive;
    }
}*/













class ExampleMod {
    constructor() {
        this.buttonText = "Example";
        this.isActive = false;
        this.updateInterval = null;
    }

    onButtonEnable() {
        // needed code for the mod to work, do not delete ANYTHING in this when creating mods.
        this.updateInterval = setInterval(() => {
            if (this.isActive) {
                this.onModUpdate();
            }
        }, 1);
        this.onEnabled();
    }

    onButtonDisable() {
        // needed code for the mod to work, do not delete ANYTHING in this when creating mods.
        clearInterval(this.updateInterval);
        this.updateInterval = null;
        this.onDisabled();
    }

    onModUpdate() {
        // dont change this unless like you want to, but this isnt where you should put your code.
        this.onUpdate();
    }




    onUpdate() {
        // FOR CLIENT CREATORS:
        // If you're dumb, this is where your actual code runs. Code here runs every frame if the mod is enabled.
    }

    onEnabled() {
        // FOR CLIENT CREATORS:
        // If you're dumb, this is where your actual code runs. Code here runs one time when the mod first enables.
    }

    onDisabled() {
        // FOR CLIENT CREATORS:
        // If you're dumb, this is where your actual code runs. Code here runs one time when the mod first disables.
    }
}










/*if (ModAPI.mc.theWorld != null)
{
var playerlookpacket = ModAPI.reflect.getClassByName("C03PacketPlayer$C05PacketPlayerLook").constructors[1];
}

class ServerNuker {
    constructor() {
        this.buttonText = "Server Nuker";
        this.isActive = false;
        this.updateInterval = null;
    }

    onButtonEnable() {
        this.updateInterval = setInterval(() => {
            if (this.isActive) {
                this.onModUpdate();
            }
        }, 1);
        this.onEnabled();
    }

    onButtonDisable() {
        clearInterval(this.updateInterval);
        this.updateInterval = null;
        this.onDisabled();
    }

    onModUpdate() {
      this.onUpdate();
    }

    crshInter = null;

    onUpdate() {
        if (ModAPI.mc.theWorld != null) {
            for (let i = 0; i < 20000; i++) {
              ModAPI.network.addToSendQueue(
                ModAPI.reflect
                  .getClassById("net.minecraft.network.play.client.C0APacketAnimation")
                  .constructors[0]()
              );
            }
          } else {
            this.isActive = false;
            this.onDisabled();
          }
    }

    onEnabled() {
        crshInter = setInterval(crash, 1000);
    }

    onDisabled() {
        if (crshInter != null) {
            clearInterval(parent.crshInter);
        }
    }
}*/






/*class NoFall {
    constructor() {
        this.buttonText = "No fall";
        this.isActive = false;
        this.updateInterval = null;
    }

    onButtonEnable() {
        this.updateInterval = setInterval(() => {
            if (this.isActive) {
                this.onModUpdate();
            }
        }, 1);
        this.onEnabled();
    }

    onButtonDisable() {
        clearInterval(this.updateInterval);
        this.updateInterval = null;
        this.onDisabled();
    }

    onModUpdate() {
        this.onUpdate();
    }

    onUpdate() {
        if (ModAPI.mc.theWorld != null) {
            if (ModAPI.player.fallDistance > 2) {
                setInterval(() => {
                    ModAPI.network.addToSendQueue(
                        playerlookpacket(ModAPI.player.rotationYaw, ModAPI.player.rotationPitch, 1)
                    );
                }, 1);
            }
        }
    }

    onEnabled() {

    }

    onDisabled() {

    }
}*/




class AutoClicker {
    constructor() {
        this.buttonText = "Auto Clicker";
        this.isActive = false;
        this.updateInterval = null;
    }

    onButtonEnable() {
        this.updateInterval = setInterval(() => {
            if (this.isActive) {
                this.onModUpdate();
            }
        }, 1);
        this.onEnabled();
    }

    onButtonDisable() {
        clearInterval(this.updateInterval);
        this.updateInterval = null;
        this.onDisabled();
    }

    onModUpdate() {
        this.onUpdate();
    }

    onUpdate() {
        setTimeout(() => {
            ModAPI.clickMouse();
        }, 100);
    }    

    onEnabled() {

    }

    onDisabled() {

    }
}


class Grappler {
    constructor() {
        this.buttonText = "Grappler";
        this.isActive = false;
        this.updateInterval = null;
    }

    onButtonEnable() {
        this.updateInterval = setInterval(() => {
            if (this.isActive) {
                this.onModUpdate();
            }
        }, 1);
        this.onEnabled();
    }

    onButtonDisable() {
        clearInterval(this.updateInterval);
        this.updateInterval = null;
        this.onDisabled();
    }

    onModUpdate() {
        this.onUpdate();
    }

    onUpdate() {
        ModAPI.require("player"); //Require the player
var GrappleHookMod = {
  oldXYZ: [0, 0, 0], //The previous hook position.
  prev: "NONE", //The previous state
  scaleH: 0.25, //Used for X and Z velocity
  scaleV: 0.15, //((Grapple Y) minus (Player Y)) times scaleV
  lift: 0.4, //Base vertical motion
  crouchToCancel: true //Whether or not crouching should disable the grappling hook.
};
ModAPI.addEventListener("update", () => { //Every client tick
  if (!ModAPI.player.fishEntity) { //If the fish hook does not exist.
    if (GrappleHookMod.prev === "GROUND" && (!GrappleHookMod.crouchToCancel || !ModAPI.player.isSneaking())) { //If the old state was ground
      GrappleHookMod.prev = "NONE"; //Update the state
      var mx = GrappleHookMod.oldXYZ[0] - ModAPI.player.x; //Get delta X
      var my = GrappleHookMod.oldXYZ[1] - ModAPI.player.y; //Get delta Y
      var mz = GrappleHookMod.oldXYZ[2] - ModAPI.player.z; //Get delta Z
      mx *= GrappleHookMod.scaleH; //Multiply by horizontal scale
      my *= GrappleHookMod.scaleV; //Multiply by vertical scale
      mz *= GrappleHookMod.scaleH; //Multiply by horizontal scale
      ModAPI.player.motionX += mx; //Add x motion
      ModAPI.player.motionY += my + GrappleHookMod.lift;  //Add y motion, plus base lift.
      ModAPI.player.motionZ += mz; //Add z motion
      ModAPI.player.reload(); //Push changes
    } else {
      GrappleHookMod.prev = "NONE";
    }
  } else if (GrappleHookMod.prev === "NONE") { //If the hook exists, but the previous state was NONE, update the state.
    GrappleHookMod.prev = "AIR";
  }
  if (
    ModAPI.player.fishEntity !== undefined && //If the fish hook exists
    GrappleHookMod.prev === "AIR" && //And the hook was previously in the air
    ModAPI.player.fishEntity.inGround //And the hook is in the ground
  ) {
    GrappleHookMod.oldXYZ = [ //Set old grapple hook position
      ModAPI.player.fishEntity.x,
      ModAPI.player.fishEntity.y,
      ModAPI.player.fishEntity.z,
    ];
    GrappleHookMod.prev = "GROUND";//Update state
  }
});
    }

    onEnabled() {

    }

    onDisabled() {

    }
}


class VanillaSpoofer {
    constructor() {
        this.buttonText = "Vanilla Spoofer";
        this.isActive = true;
        this.updateInterval = null;
        this.clientIsSpoofed = false;
    }

    onButtonEnable() {
        this.updateInterval = setInterval(() => {
            if (this.isActive) {
                this.onModUpdate();
            }
        }, 1);
        this.onEnabled();
    }

    onButtonDisable() {
        clearInterval(this.updateInterval);
        this.updateInterval = null;
        this.onDisabled();
    }

    onModUpdate() {
        this.onUpdate();
    }

    onUpdate() {
        console.clear();
    }    

    onEnabled() {
        forcePatch(ModAPI.platform.isOfflineDownload(), false);
        forcePatch(ModAPI.clientBrand, 'EaglercraftX');
        forcePatch(ModAPI.version, 'u45');
        this.clientIsSpoofed = true;
    }

    onDisabled() {

    }
}





































const style = document.createElement('style');
style.innerHTML = `
    @font-face {
        font-family: 'Minecraft';
        src: url('https://github.com/astraaxd/meteor/raw/refs/heads/main/meteor_font.woff2') format('woff2');
    }

    body {
        font-family: 'Minecraft', sans-serif;
        color: white;
        margin: 0;
        padding: 0;
    }

    #modMenu {
        display: none;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.85);
        border-radius: 15px;
        box-shadow: 0 0 30px rgba(255, 102, 0, 0.56);
        padding: 40px;
        width: 500px;
        height: 600px;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        overflow-y: auto;
    }

    #modMenu h1 {
        font-size: 36px;
        color: #FF4500;
        text-align: center;
        margin-bottom: 30px;
    }

    .modItemContainer {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 100%;
        gap: 10px;
    }

    .modItem {
        margin: 0;
    }

    .modItem button {
        width: 170px;
        height: 55px;
        background-color: #FF4500;
        border: 2px solid #FF4500;
        color: white;
        font-size: 16px;
        cursor: pointer;
        border-radius: 5px;
        transition: all 0.3s ease;
        text-align: center;
        font-family: 'Minecraft', sans-serif;
    }

    .modItem button:hover {
        transform: scale(1.1);
    }

    .modItem button.active {
        background-color: #32CD32;
        border-color: #32CD32;
        transform: scale(1.1);
    }

    .menuToggleBtn {
        position: absolute;
        top: 20px;
        left: 20px;
        background:rgb(187, 50, 0);
        border: none;
        border-radius: 5px;
        padding: 15px;
        font-size: 20px;
        color: white;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .menuToggleBtn:hover {
        background-color:rgb(255, 85, 0);
    }
`;
document.head.appendChild(style);

class ModButton {
    constructor() {
        this.buttonText = "Mod Button";
        this.isActive = false;
    }
    onButtonEnable() {}
    onButtonDisable() {}
    onModUpdate() {}
}

const activeMods = [];

let isMenuVisible = false;

function toggleMenu() {
    const menu = document.getElementById("modMenu");
    isMenuVisible = !isMenuVisible;
    menu.style.display = isMenuVisible ? "flex" : "none";
}



















// FOR CLIENT CREATORS: Everytime you make a mod, you MUST add ", new ClassName()" to the modButtons.
const modButtons = [new AutoClicker(), new Grappler(), new VanillaSpoofer()];



























function createModMenu() {
    const modMenu = document.createElement("div");
    modMenu.id = "modMenu";
    modMenu.style.display = "none";

    const title = document.createElement("h1");
    title.innerText = "MeteorX Client";
    modMenu.appendChild(title);

    const modItemContainer = document.createElement("div");
    modItemContainer.classList.add("modItemContainer");

    modButtons.forEach(mod => {
        const modItem = document.createElement("div");
        modItem.classList.add("modItem");

        const button = document.createElement("button");
        button.textContent = mod.buttonText;
        button.addEventListener("click", () => {
            if (mod.isActive) {
                mod.onButtonDisable();
                mod.isActive = false;
                button.classList.remove("active");
                activeMods.splice(activeMods.indexOf(mod), 1);
            } else {
                mod.onButtonEnable();
                mod.isActive = true;
                button.classList.add("active");
                activeMods.push(mod);
                mod.onModUpdate();
            }
        });

        modItem.appendChild(button);
        modItemContainer.appendChild(modItem);
    });

    modMenu.appendChild(modItemContainer);
    document.body.appendChild(modMenu);
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" || event.key === "`") toggleMenu();
});

createModMenu();