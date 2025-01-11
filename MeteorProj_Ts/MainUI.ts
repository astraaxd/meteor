interface UIButton {
    buttonText: string;
    method: (parent: UIButton) => void;
    onEnabled?: () => void;
    onDisabled?: () => void;
    onUpdate?: () => void;
    isTogglable: boolean;
    isActive?: boolean;
}

let isMenuVisible: boolean = false;
const activeMethods: (() => void)[] = [];
const activeIntervals: NodeJS.Timeout[] = [];

const modButtons: UIButton[] = [
    { buttonText: "Crash Server", method: (parent) => ServerCrasher(parent), isTogglable: true },
    { buttonText: "Instant Break", method: (parent) => FastBreak(parent), isTogglable: true },
    { buttonText: "ESP", method: (parent) => ESP(parent), isTogglable: true },
    { buttonText: "Auto Clicker", method: (parent) => AutoClick(parent), isTogglable: true },
];

function toggleMenu(): void {
    const menu = document.getElementById("modMenu") as HTMLElement;
    isMenuVisible = !isMenuVisible;
    menu.style.display = isMenuVisible ? "block" : "none";
}

document.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Escape") toggleMenu();
    if (event.key === "`") isMenuVisible && toggleMenu();
});

function injectCSS(): void {
    const style = document.createElement("style");
    style.textContent = `
        @import url('https://github.com/astraaxd/ProjectTaggersAPI/raw/refs/heads/main/minecraft.woff2;700&display=swap');
        
        body {
            margin: 0;
            font-family: 'minecraft', sans-serif;
            background-color: #1e1e1e;
            color: #e0e0e0;
        }
        #modMenu {
            display: none;
            position: fixed;
            top: 20px;
            left: 20px;
            background: #2c2c2c;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
            padding: 20px;
            width: 320px;
            z-index: 1000;
        }
        #modMenu h1 {
            font-size: 24px;
            color: #ff5722;
            text-align: center;
            margin-bottom: 20px;
        }
        .modItem {
            margin: 15px 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .modItem label {
            font-size: 16px;
            color: #e0e0e0;
        }
        .modItem input[type="checkbox"] {
            width: 20px;
            height: 20px;
            cursor: pointer;
            appearance: none;
            border: 2px solid #ff5722;
            border-radius: 5px;
            position: relative;
            transition: background-color 0.3s;
        }
        .modItem input[type="checkbox"]:checked {
            background-color: #ff5722;
        }
        .modItem input[type="checkbox"]:checked::before {
            content: 'X';
            position: absolute;
            top: 2px;
            left: 2px;
            font-size: 14px;
            color: white;
        }
        .menuToggleBtn {
            position: absolute;
            top: 20px;
            left: 20px;
            background: #ff5722;
            border: none;
            border-radius: 5px;
            padding: 10px;
            font-size: 16px;
            color: white;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        .menuToggleBtn:hover {
            background-color: #e64a19;
        }
    `;
    document.head.appendChild(style);
}

function createModMenu(): void {
    injectCSS(); // Apply the existing CSS styling

    const modMenu = document.createElement("div");
    modMenu.id = "modMenu";  // Set up the main mod menu container

    const title = document.createElement("h1");
    title.innerText = "Meteor Client";  // Title for the menu
    modMenu.appendChild(title);

    // Create the button list with a more streamlined approach
    modButtons.forEach((button) => {
        const modItem = document.createElement("div");
        modItem.classList.add("modItem");  // Styling for each item

        // Create a container for the label and toggle element
        const toggleContainer = document.createElement("div");
        toggleContainer.classList.add("toggleContainer");

        const label = document.createElement("label");
        label.textContent = button.buttonText;  // Label text based on the button name
        toggleContainer.appendChild(label);

        const toggleSwitch = document.createElement("input");
        toggleSwitch.type = button.isTogglable ? "checkbox" : "button";  // Determine if it should be a checkbox or button
        toggleSwitch.checked = button.isActive || false;
        toggleSwitch.value = button.buttonText;
        toggleSwitch.classList.add("toggleSwitch");

        toggleSwitch.addEventListener("click", () => handleButtonClick(button));

        toggleContainer.appendChild(toggleSwitch);
        modItem.appendChild(toggleContainer);
        modMenu.appendChild(modItem);
    });

    document.body.appendChild(modMenu); // Append the mod menu to the body

    function handleButtonClick(button: UIButton) {
        if (button.isTogglable) {
            if (button.isActive) {
                deactivateButton(button);
            } else {
                activateButton(button);
            }
        } else {
            button.method(button);
        }
    }

    function activateButton(button: UIButton) {
        button.isActive = true;
        if (button.onEnabled) button.onEnabled();

        if (button.method === ServerCrasher) {
            const interval = setInterval(() => button.method(button), 1000);
            activeIntervals.push(interval);
        } else {
            activeMethods.push(() => button.method(button));
        }

        // Start the update loop if the button has an onUpdate function
        if (button.onUpdate) {
            startButtonUpdate(button);
        }
    }

    function deactivateButton(button: UIButton) {
        button.isActive = false;
        if (button.onDisabled) button.onDisabled();

        if (button.method === ServerCrasher) {
            const interval = activeIntervals.pop();
            if (interval) clearInterval(interval);
        } else {
            const index = activeMethods.indexOf(() => button.method(button));
            if (index > -1) activeMethods.splice(index, 1);
        }

        // Stop the update loop if the button had an onUpdate function
        if (button.onUpdate) {
            stopButtonUpdate(button);
        }
    }

    function startButtonUpdate(button: UIButton) {
        const updateInterval = setInterval(() => {
            if (button.isActive && button.onUpdate) {
                button.onUpdate();
            }
        }, 100); // Run update every 100ms or adjust as needed

        activeIntervals.push(updateInterval);
    }

    function stopButtonUpdate(button: UIButton) {
        const index = activeIntervals.findIndex((interval) => {
            // Check if this interval is for the button's onUpdate
            return interval;
        });

        if (index > -1) {
            clearInterval(activeIntervals[index]);
            activeIntervals.splice(index, 1);
        }
    }
}


// A function that runs updates for active mods
function runActiveUpdates(): void {
    modButtons.forEach(button => {
        if (button.isActive && button.onUpdate) {
            button.onUpdate();
        }
    });
    requestAnimationFrame(runActiveUpdates);
}



createModMenu();
//runActiveUpdates();











//=================================================================================================    =================================================================================================
//=============================================================================================    MODS    =============================================================================================
//=================================================================================================    =================================================================================================

function ServerCrasher() {
    // @ts-ignore
    if (ModAPI.mc.theWorld != null) {
        for (let i = 0; i < 1000; i++) {
            // @ts-ignore
            ModAPI.network.addToSendQueue(
                // @ts-ignore
                ModAPI.reflect
                    .getClassById(
                        "net.minecraft.network.play.client.C0APacketAnimation"
                    )
                    .constructors[0]()
            );
        }
    }
}

function AutoClick(parent: UIButton): void {
    parent.onEnabled = () => {
        ModAPI.displayToChat("test OnEnabled");
    }
    parent.onDisabled = () => {
        ModAPI.displayToChat("test OnDisabled");
    }
    parent.onUpdate = () => {
        ModAPI.displayToChat("test OnUpdate");
        ModAPI.clickMouse();
    }
}

function ESP(parent: UIButton) {
    //@ts-ignore
    let worldRenderer = ModAPI.reflect
        .getClassById("net.minecraft.client.renderer.Tessellator")
        .staticMethods.getInstance.method().$worldRenderer;

    //@ts-ignore
    let tessellatorInstance = ModAPI.reflect
        .getClassById("net.minecraft.client.renderer.Tessellator")
        .staticMethods.getInstance.method();

    //@ts-ignore
    const originalRenderBoundingBox = ModAPI.hooks.methods.nmcre_RenderManager_renderDebugBoundingBox;

    class DebugBoundingBoxHandler {
        constructor() {
            if (parent.isActive) {
                //@ts-ignore
                ModAPI.hooks.methods.nmcre_RenderManager_renderDebugBoundingBox = function (...args) {
                    //@ts-ignore
                    ModAPI.hooks.methods.nlevo_GlStateManager_disableDepth();
                    originalRenderBoundingBox.apply(this, args);
                    //@ts-ignore
                    ModAPI.hooks.methods.nlevo_GlStateManager_enableDepth();
                };
            } else {
                //@ts-ignore
                ModAPI.hooks.methods.nmcre_RenderManager_renderDebugBoundingBox = originalRenderBoundingBox;
            }
        }

        static onClick() {
            //@ts-ignore
            tessellatorInstance.remove();
        }
    }

    parent.onUpdate = () => {
        //@ts-ignore
        if (parent.isActive && ModAPI.mc.renderManager != null) {
            //@ts-ignore
            ModAPI.mc.renderManager.debugBoundingBox = 1;
        }
    };

    parent.onEnabled = () => {
        new DebugBoundingBoxHandler();
        //@ts-ignore
        if (ModAPI.mc.renderManager) {
            //@ts-ignore
            ModAPI.mc.renderManager.debugBoundingBox = 1;
        }
    };

    parent.onDisabled = () => {
        new DebugBoundingBoxHandler();
        //@ts-ignore
        if (ModAPI.mc.renderManager) {
            //@ts-ignore
            ModAPI.mc.renderManager.debugBoundingBox = 0;
        }
    };
}

function FastBreak(parent: UIButton) {
    parent.onUpdate = () => {
        if (parent.isActive) {
            //@ts-ignore
            ModAPI.mc.rightClickDelayTimer = 0;
        }
    };
}