/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/main.ts
__export(exports, {
  default: () => Doubleshift2,
  findCommand: () => findCommand
});
var import_obsidian4 = __toModule(require("obsidian"));

// src/CommandSuggestion.ts
var import_obsidian = __toModule(require("obsidian"));
var commandSuggestion = class extends import_obsidian.FuzzySuggestModal {
  constructor(app2, plugin, shortcut) {
    super(app2);
    var _a, _b;
    this.plugin = plugin;
    this.shortcut = shortcut;
    this.setPlaceholder((_b = (_a = findCommand(shortcut.command)) == null ? void 0 : _a.name) != null ? _b : shortcut.command);
    this.open();
  }
  getItems() {
    return Object.values(this.plugin.commands);
  }
  getItemText(command) {
    return command.name;
  }
  onChooseItem(item, evt) {
    let command = findCommand(this.getItemText(item));
    this.shortcut.command = command.id;
    this.plugin.saveSettings();
    this.plugin.settingsTab.display();
  }
};

// src/DoubleshiftSettings.ts
var import_obsidian3 = __toModule(require("obsidian"));

// src/Shortcut.ts
var ShortcutCreator = class {
  constructor(plugin) {
    let shortcut = new class {
      constructor() {
        this.command = "";
        this.key = "Shift";
        this.lastKeyUpTime = Date.now();
      }
    }();
    new commandSuggestion(plugin.app, plugin, shortcut);
    plugin.settings.shortcuts.push(shortcut);
  }
};

// src/KeySelector.ts
var import_obsidian2 = __toModule(require("obsidian"));
var KeySelector = class extends import_obsidian2.Modal {
  constructor(app2, plugin, shortcut) {
    super(app2);
    this.plugin = plugin;
    this.shortcut = shortcut;
    this.key = this.shortcut.key;
  }
  onOpen() {
    let { contentEl } = this;
    let instructionEl = document.createElement("div");
    instructionEl.textContent = "press any key to change your current one. close this window to cancel";
    instructionEl.style.position = "absolute";
    instructionEl.style.left = "100";
    instructionEl.style.top = "1";
    instructionEl.style.fontSize = "12px";
    let shiftEl = document.createElement("h1");
    shiftEl.textContent = this.shortcut.key === " " ? "SPACE" : this.shortcut.key.toUpperCase();
    shiftEl.style.textAlign = "center";
    shiftEl.style.paddingTop = "50px";
    shiftEl.style.paddingBottom = "50px";
    let buttonEl = document.createElement("button");
    buttonEl.textContent = "Save";
    buttonEl.style.display = "block";
    buttonEl.style.margin = "0 auto";
    buttonEl.tabIndex = -1;
    buttonEl.addEventListener("click", () => this.save());
    contentEl.appendChild(instructionEl);
    contentEl.appendChild(shiftEl);
    contentEl.appendChild(buttonEl);
    document.addEventListener("keydown", (event) => this.detectKeypress(event, shiftEl));
  }
  save() {
    this.shortcut.key = this.key;
    this.plugin.saveSettings();
    this.plugin.settingsTab.display();
    this.close();
  }
  detectKeypress(event, element) {
    element.textContent = event.key === " " ? "SPACE" : event.key.toUpperCase();
    this.key = event.key;
  }
  onClose() {
    let { contentEl } = this;
    let buttonEl = contentEl.querySelector("button");
    let shiftEl = contentEl.querySelector("h1");
    buttonEl.removeEventListener("click", () => this.save());
    document.removeEventListener("keydown", (event) => this.detectKeypress(event, shiftEl));
    contentEl.empty();
  }
};

// src/DoubleshiftSettings.ts
var DoubleshiftSettings = class extends import_obsidian3.PluginSettingTab {
  constructor(app2, plugin, commands) {
    super(app2, plugin);
    this.plugin = plugin;
    this.commands = commands;
  }
  display() {
    this.plugin.refreshCommands();
    let { containerEl } = this;
    containerEl.empty();
    new import_obsidian3.Setting(containerEl).setName("Delay").setDesc("The maximum delay between two presses of the respective key in 1/10 of a second").setTooltip("depending on how fast you type a too high number might annoy you").addSlider((component) => {
      component.setValue(this.plugin.settings.delay / 10).setDynamicTooltip().onChange((value) => __async(this, null, function* () {
        this.plugin.settings.delay = Number(value * 10);
        yield this.plugin.saveSettings();
      }));
    });
    new import_obsidian3.Setting(containerEl).setHeading().setName("Shortcuts").setDesc("all shortcuts you have currently set up").setHeading().setDisabled(true);
    this.plugin.settings.shortcuts.forEach((shortcut) => {
      let available = findCommand(shortcut.command) !== null;
      let s = new import_obsidian3.Setting(containerEl).addButton((component) => {
        component.setTooltip("change key").setButtonText(shortcut.key === " " ? "Space" : shortcut.key).onClick(() => {
          let sel = new KeySelector(this.app, this.plugin, shortcut);
          sel.open();
        });
      }).addButton((component) => {
        let commandName;
        if (available) {
          commandName = findCommand(shortcut.command).name;
        } else {
          commandName = "";
        }
        component.setButtonText("select command").setTooltip(commandName).onClick(() => {
          new commandSuggestion(this.app, this.plugin, shortcut);
          component.setTooltip(commandName);
          containerEl.empty();
          this.display();
        });
      }).addButton((component) => {
        component.setIcon("trash").onClick(() => {
          this.plugin.settings.shortcuts.remove(shortcut);
          this.plugin.saveSettings();
          containerEl.empty();
          this.display();
        });
      });
      if (!available) {
        s.setDesc("the corresponding plugin has been disabled or uninstalled");
      }
    });
    new import_obsidian3.Setting(containerEl).addButton((component) => {
      component.setButtonText("Add").onClick(() => __async(this, null, function* () {
        yield new ShortcutCreator(this.plugin);
        yield this.plugin.saveSettings();
        containerEl.empty();
        this.display();
      }));
    });
  }
};

// src/main.ts
function findCommand(a) {
  let commands = Object.values(this.app.commands.commands);
  for (let i = 0; i < commands.length; i++) {
    let command = commands[i];
    if (command.id === a || command.name === a) {
      return command;
    }
  }
  return null;
}
var DEFAULT_SETTINGS = {
  delay: 500,
  key: "Shift",
  shortcuts: [new class {
    constructor() {
      this.command = "command-palette:open";
      this.key = "Shift";
      this.lastKeyUpTime = Date.now();
    }
  }()]
};
var Doubleshift2 = class extends import_obsidian4.Plugin {
  loadSettings() {
    return __async(this, null, function* () {
      this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
      this.refreshCommands();
    });
  }
  refreshCommands() {
    this.commands = Object.values(this.app.commands.commands);
  }
  saveSettings() {
    return __async(this, null, function* () {
      yield this.saveData(this.settings);
    });
  }
  onload() {
    return __async(this, null, function* () {
      yield this.loadSettings();
      this.settingsTab = new DoubleshiftSettings(this.app, this, this.commands);
      this.addSettingTab(this.settingsTab);
      this.registerDomEvent(window, "keyup", (event) => this.doubleshift(event.key));
    });
  }
  doubleshift(key) {
    this.settings.shortcuts.forEach((shortcut) => {
      if (key !== shortcut.key) {
        shortcut.lastKeyUpTime = 0;
        return;
      }
      if (Date.now() - shortcut.lastKeyUpTime < this.settings.delay) {
        shortcut.lastKeyUpTime = 0;
        app.commands.executeCommandById(shortcut.command);
      } else {
        shortcut.lastKeyUpTime = Date.now();
      }
    });
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL21haW4udHMiLCAic3JjL0NvbW1hbmRTdWdnZXN0aW9uLnRzIiwgInNyYy9Eb3VibGVzaGlmdFNldHRpbmdzLnRzIiwgInNyYy9TaG9ydGN1dC50cyIsICJzcmMvS2V5U2VsZWN0b3IudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7Q29tbWFuZCwgUGx1Z2lufSBmcm9tICdvYnNpZGlhbic7XHJcbmltcG9ydCB7IERvdWJsZXNoaWZ0U2V0dGluZ3MgfSBmcm9tICcuL0RvdWJsZXNoaWZ0U2V0dGluZ3MnO1xyXG5pbXBvcnQge1Nob3J0Y3V0fSBmcm9tIFwiLi9TaG9ydGN1dFwiO1xyXG5cclxuaW50ZXJmYWNlIFNldHRpbmdzIHtcclxuXHRkZWxheTogbnVtYmVyO1xyXG5cdGtleTogc3RyaW5nO1xyXG5cdHNob3J0Y3V0czogU2hvcnRjdXRbXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRDb21tYW5kKGE6IHN0cmluZyk6IENvbW1hbmR7XHJcblx0bGV0IGNvbW1hbmRzID0gT2JqZWN0LnZhbHVlcyh0aGlzLmFwcC5jb21tYW5kcy5jb21tYW5kcyk7XHJcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjb21tYW5kcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0Ly8gQHRzLWlnbm9yZVxyXG5cdFx0bGV0IGNvbW1hbmQ6IENvbW1hbmQgPSBjb21tYW5kc1tpXTtcclxuXHRcdGlmKGNvbW1hbmQuaWQgPT09IGEgfHwgY29tbWFuZC5uYW1lID09PSBhKSB7XHJcblx0XHRcdHJldHVybiBjb21tYW5kO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRyZXR1cm4gbnVsbDtcclxufVxyXG5cclxuY29uc3QgREVGQVVMVF9TRVRUSU5HUzogUGFydGlhbDxTZXR0aW5ncz4gPSB7XHJcblx0ZGVsYXk6IDUwMCxcclxuXHRrZXk6ICdTaGlmdCcsXHJcblx0c2hvcnRjdXRzOiBbbmV3IGNsYXNzIGltcGxlbWVudHMgU2hvcnRjdXQge1xyXG5cdFx0Y29tbWFuZCA9ICdjb21tYW5kLXBhbGV0dGU6b3Blbic7XHJcblx0XHRrZXkgPSAnU2hpZnQnO1xyXG5cdFx0bGFzdEtleVVwVGltZSA9IERhdGUubm93KCk7XHJcblx0fV1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG91Ymxlc2hpZnQgZXh0ZW5kcyBQbHVnaW4ge1xyXG5cdHNldHRpbmdzOiBTZXR0aW5ncztcclxuXHRjb21tYW5kczogQ29tbWFuZFtdO1xyXG5cdHNldHRpbmdzVGFiOiBEb3VibGVzaGlmdFNldHRpbmdzO1xyXG5cclxuXHRhc3luYyBsb2FkU2V0dGluZ3MoKSB7XHJcblx0XHR0aGlzLnNldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9TRVRUSU5HUywgYXdhaXQgdGhpcy5sb2FkRGF0YSgpKTtcclxuXHRcdHRoaXMucmVmcmVzaENvbW1hbmRzKCk7XHJcblx0fVxyXG5cclxuXHRyZWZyZXNoQ29tbWFuZHMoKSB7XHJcblx0XHQvLyBAdHMtaWdub3JlXHJcblx0XHR0aGlzLmNvbW1hbmRzID0gT2JqZWN0LnZhbHVlcyh0aGlzLmFwcC5jb21tYW5kcy5jb21tYW5kcyk7XHJcblx0fVxyXG5cclxuXHJcblx0YXN5bmMgc2F2ZVNldHRpbmdzKCkge1xyXG5cdFx0YXdhaXQgdGhpcy5zYXZlRGF0YSh0aGlzLnNldHRpbmdzKTtcclxuXHR9XHJcblxyXG5cclxuXHRhc3luYyBvbmxvYWQoKSB7XHJcblx0XHRhd2FpdCB0aGlzLmxvYWRTZXR0aW5ncygpO1xyXG5cdFx0dGhpcy5zZXR0aW5nc1RhYiA9IG5ldyBEb3VibGVzaGlmdFNldHRpbmdzKHRoaXMuYXBwLCB0aGlzLCB0aGlzLmNvbW1hbmRzKTtcclxuXHRcdHRoaXMuYWRkU2V0dGluZ1RhYih0aGlzLnNldHRpbmdzVGFiKTtcclxuXHRcdHRoaXMucmVnaXN0ZXJEb21FdmVudCh3aW5kb3csICdrZXl1cCcsIChldmVudCkgPT4gdGhpcy5kb3VibGVzaGlmdChldmVudC5rZXkpKTtcclxuXHR9XHJcblxyXG5cdGRvdWJsZXNoaWZ0KGtleTogc3RyaW5nKSB7XHJcblx0XHR0aGlzLnNldHRpbmdzLnNob3J0Y3V0cy5mb3JFYWNoKHNob3J0Y3V0ID0+IHtcclxuXHRcdFx0aWYgKGtleSAhPT0gc2hvcnRjdXQua2V5KSB7XHJcblx0XHRcdFx0c2hvcnRjdXQubGFzdEtleVVwVGltZSA9IDA7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChEYXRlLm5vdygpIC0gc2hvcnRjdXQubGFzdEtleVVwVGltZSA8IHRoaXMuc2V0dGluZ3MuZGVsYXkpIHtcclxuXHRcdFx0XHRzaG9ydGN1dC5sYXN0S2V5VXBUaW1lID0gMDtcclxuXHJcblx0XHRcdFx0Ly8gQHRzLWlnbm9yZVxyXG5cdFx0XHRcdGFwcC5jb21tYW5kcy5leGVjdXRlQ29tbWFuZEJ5SWQoc2hvcnRjdXQuY29tbWFuZCk7XHJcblxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHNob3J0Y3V0Lmxhc3RLZXlVcFRpbWUgPSBEYXRlLm5vdygpO1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxufVxyXG4iLCAiaW1wb3J0IHtBcHAsIENvbW1hbmQsIEZ1enp5U3VnZ2VzdE1vZGFsfSBmcm9tIFwib2JzaWRpYW5cIjtcclxuaW1wb3J0IERvdWJsZXNoaWZ0IGZyb20gXCIuL21haW5cIlxyXG5pbXBvcnQgeyBmaW5kQ29tbWFuZCB9IGZyb20gXCIuL21haW5cIlxyXG5pbXBvcnQge1Nob3J0Y3V0fSBmcm9tIFwiLi9TaG9ydGN1dFwiO1xyXG5pbXBvcnQge0RvdWJsZXNoaWZ0U2V0dGluZ3N9IGZyb20gXCIuL0RvdWJsZXNoaWZ0U2V0dGluZ3NcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBjb21tYW5kU3VnZ2VzdGlvbiBleHRlbmRzIEZ1enp5U3VnZ2VzdE1vZGFsPENvbW1hbmQ+IHtcclxuXHJcblx0cGx1Z2luOiBEb3VibGVzaGlmdDtcclxuXHRzaG9ydGN1dDogU2hvcnRjdXQ7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IERvdWJsZXNoaWZ0LCBzaG9ydGN1dDogU2hvcnRjdXQpIHtcclxuXHRcdHN1cGVyKGFwcCk7XHJcblx0XHR0aGlzLnBsdWdpbiA9IHBsdWdpbjtcclxuXHRcdHRoaXMuc2hvcnRjdXQgPSBzaG9ydGN1dDtcclxuXHRcdHRoaXMuc2V0UGxhY2Vob2xkZXIoZmluZENvbW1hbmQoc2hvcnRjdXQuY29tbWFuZCk/Lm5hbWUgPz8gc2hvcnRjdXQuY29tbWFuZCk7XHJcblx0XHR0aGlzLm9wZW4oKTtcclxuXHR9XHJcblxyXG5cdGdldEl0ZW1zKCk6IENvbW1hbmRbXSB7XHJcblx0XHRyZXR1cm4gT2JqZWN0LnZhbHVlcyh0aGlzLnBsdWdpbi5jb21tYW5kcyk7XHJcblx0fVxyXG5cclxuXHRnZXRJdGVtVGV4dChjb21tYW5kOiBDb21tYW5kKTogc3RyaW5nIHtcclxuXHRcdHJldHVybiBjb21tYW5kLm5hbWU7XHJcblx0fVxyXG5cclxuXHRvbkNob29zZUl0ZW0oaXRlbTogQ29tbWFuZCwgZXZ0OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xyXG5cdFx0bGV0IGNvbW1hbmQgPSBmaW5kQ29tbWFuZCh0aGlzLmdldEl0ZW1UZXh0KGl0ZW0pKTtcclxuXHRcdHRoaXMuc2hvcnRjdXQuY29tbWFuZCA9IGNvbW1hbmQuaWQ7XHJcblx0XHR0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuXHRcdHRoaXMucGx1Z2luLnNldHRpbmdzVGFiLmRpc3BsYXkoKTtcclxuXHR9XHJcbn1cclxuIiwgImltcG9ydCBEb3VibGVzaGlmdCwge2ZpbmRDb21tYW5kfSBmcm9tIFwiLi9tYWluXCI7XHJcbmltcG9ydCB7Y29tbWFuZFN1Z2dlc3Rpb259IGZyb20gXCIuL0NvbW1hbmRTdWdnZXN0aW9uXCI7XHJcbmltcG9ydCB7QXBwLCBDb21tYW5kLCBQbHVnaW5TZXR0aW5nVGFiLCBTZXR0aW5nfSBmcm9tIFwib2JzaWRpYW5cIjtcclxuaW1wb3J0IHtTaG9ydGN1dENyZWF0b3J9IGZyb20gXCIuL1Nob3J0Y3V0XCI7XHJcbmltcG9ydCB7S2V5U2VsZWN0b3J9IGZyb20gXCIuL0tleVNlbGVjdG9yXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRG91Ymxlc2hpZnRTZXR0aW5ncyBleHRlbmRzIFBsdWdpblNldHRpbmdUYWIge1xyXG5cclxuXHRwbHVnaW46IERvdWJsZXNoaWZ0O1xyXG5cdGNvbW1hbmRzOiBDb21tYW5kW107XHJcblxyXG5cdGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IERvdWJsZXNoaWZ0LCBjb21tYW5kczogQ29tbWFuZFtdKSB7XHJcblx0XHRzdXBlcihhcHAsIHBsdWdpbik7XHJcblx0XHR0aGlzLnBsdWdpbiA9IHBsdWdpbjtcclxuXHRcdHRoaXMuY29tbWFuZHMgPSBjb21tYW5kcztcclxuXHR9XHJcblxyXG5cdGRpc3BsYXkoKTogdm9pZCB7XHJcblxyXG5cdFx0dGhpcy5wbHVnaW4ucmVmcmVzaENvbW1hbmRzKCk7XHJcblxyXG5cdFx0bGV0IHsgY29udGFpbmVyRWwgfSA9IHRoaXM7XHJcblxyXG5cdFx0Y29udGFpbmVyRWwuZW1wdHkoKTtcclxuXHJcblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuXHRcdFx0LnNldE5hbWUoXCJEZWxheVwiKVxyXG5cdFx0XHQuc2V0RGVzYyhcIlRoZSBtYXhpbXVtIGRlbGF5IGJldHdlZW4gdHdvIHByZXNzZXMgb2YgdGhlIHJlc3BlY3RpdmUga2V5IGluIDEvMTAgb2YgYSBzZWNvbmRcIilcclxuXHRcdFx0LnNldFRvb2x0aXAoXCJkZXBlbmRpbmcgb24gaG93IGZhc3QgeW91IHR5cGUgYSB0b28gaGlnaCBudW1iZXIgbWlnaHQgYW5ub3kgeW91XCIpXHJcblx0XHRcdC5hZGRTbGlkZXIoIGNvbXBvbmVudCA9PiB7XHJcblx0XHRcdFx0Y29tcG9uZW50XHJcblx0XHRcdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZGVsYXkvMTApXHJcblx0XHRcdFx0XHQuc2V0RHluYW1pY1Rvb2x0aXAoKVxyXG5cdFx0XHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5kZWxheSA9IE51bWJlcih2YWx1ZSoxMClcclxuXHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XHJcblx0XHRcdFx0XHR9KVxyXG5cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcblx0XHRcdC5zZXRIZWFkaW5nKClcclxuXHRcdFx0LnNldE5hbWUoXCJTaG9ydGN1dHNcIilcclxuXHRcdFx0LnNldERlc2MoXCJhbGwgc2hvcnRjdXRzIHlvdSBoYXZlIGN1cnJlbnRseSBzZXQgdXBcIilcclxuXHRcdFx0LnNldEhlYWRpbmcoKVxyXG5cdFx0XHQuc2V0RGlzYWJsZWQodHJ1ZSlcclxuXHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnNob3J0Y3V0cy5mb3JFYWNoKHNob3J0Y3V0ID0+IHtcclxuXHRcdFx0bGV0IGF2YWlsYWJsZSA9IGZpbmRDb21tYW5kKHNob3J0Y3V0LmNvbW1hbmQpICE9PSBudWxsO1xyXG5cdFx0XHRsZXQgcyA9IG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG5cdFx0XHRcdC5hZGRCdXR0b24oY29tcG9uZW50ID0+IHtcclxuXHRcdFx0XHRcdGNvbXBvbmVudFxyXG5cdFx0XHRcdFx0XHQuc2V0VG9vbHRpcChcImNoYW5nZSBrZXlcIilcclxuXHRcdFx0XHRcdFx0LnNldEJ1dHRvblRleHQoc2hvcnRjdXQua2V5ID09PSBcIiBcIiA/IFwiU3BhY2VcIiA6IHNob3J0Y3V0LmtleSlcclxuXHRcdFx0XHRcdFx0Lm9uQ2xpY2soKCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdGxldCBzZWwgPSBuZXcgS2V5U2VsZWN0b3IodGhpcy5hcHAsIHRoaXMucGx1Z2luLCBzaG9ydGN1dCk7XHJcblx0XHRcdFx0XHRcdFx0c2VsLm9wZW4oKTtcclxuXHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC5hZGRCdXR0b24oY29tcG9uZW50ID0+IHtcclxuXHRcdFx0XHRcdGxldCBjb21tYW5kTmFtZTogc3RyaW5nO1xyXG5cdFx0XHRcdFx0aWYgKGF2YWlsYWJsZSkge1xyXG5cdFx0XHRcdFx0XHRjb21tYW5kTmFtZSA9IGZpbmRDb21tYW5kKHNob3J0Y3V0LmNvbW1hbmQpLm5hbWU7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRjb21tYW5kTmFtZSA9IFwiXCJcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGNvbXBvbmVudFxyXG5cdFx0XHRcdFx0XHQuc2V0QnV0dG9uVGV4dChcInNlbGVjdCBjb21tYW5kXCIpXHJcblx0XHRcdFx0XHRcdC5zZXRUb29sdGlwKGNvbW1hbmROYW1lKVxyXG5cdFx0XHRcdFx0XHQub25DbGljaygoKSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0bmV3IGNvbW1hbmRTdWdnZXN0aW9uKHRoaXMuYXBwLCB0aGlzLnBsdWdpbiwgc2hvcnRjdXQpO1xyXG5cdFx0XHRcdFx0XHRcdGNvbXBvbmVudC5zZXRUb29sdGlwKGNvbW1hbmROYW1lKTtcclxuXHRcdFx0XHRcdFx0XHRjb250YWluZXJFbC5lbXB0eSgpO1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuZGlzcGxheSgpO1xyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0LmFkZEJ1dHRvbihjb21wb25lbnQgPT4ge1xyXG5cdFx0XHRcdFx0Y29tcG9uZW50XHJcblx0XHRcdFx0XHRcdC5zZXRJY29uKFwidHJhc2hcIilcclxuXHRcdFx0XHRcdFx0Lm9uQ2xpY2soKCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnNob3J0Y3V0cy5yZW1vdmUoc2hvcnRjdXQpO1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xyXG5cdFx0XHRcdFx0XHRcdGNvbnRhaW5lckVsLmVtcHR5KCk7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5kaXNwbGF5KCk7XHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0aWYgKCFhdmFpbGFibGUpe1xyXG5cdFx0XHRcdHMuc2V0RGVzYyhcInRoZSBjb3JyZXNwb25kaW5nIHBsdWdpbiBoYXMgYmVlbiBkaXNhYmxlZCBvciB1bmluc3RhbGxlZFwiKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcblx0XHRcdC5hZGRCdXR0b24oY29tcG9uZW50ID0+IHtcclxuXHRcdFx0XHRjb21wb25lbnRcclxuXHRcdFx0XHRcdC5zZXRCdXR0b25UZXh0KFwiQWRkXCIpXHJcblx0XHRcdFx0XHQub25DbGljayhhc3luYyAoKSA9PiB7XHJcblx0XHRcdFx0XHRcdGF3YWl0IG5ldyBTaG9ydGN1dENyZWF0b3IodGhpcy5wbHVnaW4pO1xyXG5cdFx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuXHRcdFx0XHRcdFx0Y29udGFpbmVyRWwuZW1wdHkoKTtcclxuXHRcdFx0XHRcdFx0dGhpcy5kaXNwbGF5KCk7XHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHR9KVxyXG5cdH1cclxufVxyXG4iLCAiaW1wb3J0IERvdWJsZXNoaWZ0IGZyb20gXCIuL21haW5cIjtcclxuaW1wb3J0IHtjb21tYW5kU3VnZ2VzdGlvbn0gZnJvbSBcIi4vQ29tbWFuZFN1Z2dlc3Rpb25cIjtcclxuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFNob3J0Y3V0e1xyXG5cdGtleTogc3RyaW5nO1xyXG5cdGNvbW1hbmQ6IHN0cmluZztcclxuXHRsYXN0S2V5VXBUaW1lOiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTaG9ydGN1dENyZWF0b3Ige1xyXG5cdGNvbnN0cnVjdG9yKHBsdWdpbjogRG91Ymxlc2hpZnQpIHtcclxuXHRcdGxldCBzaG9ydGN1dCA9IG5ldyBjbGFzcyBpbXBsZW1lbnRzIFNob3J0Y3V0IHtcclxuXHRcdFx0Y29tbWFuZCA9IFwiXCJcclxuXHRcdFx0a2V5ID0gXCJTaGlmdFwiO1xyXG5cdFx0XHRsYXN0S2V5VXBUaW1lID0gRGF0ZS5ub3coKTtcclxuXHRcdH1cclxuXHRcdG5ldyBjb21tYW5kU3VnZ2VzdGlvbihwbHVnaW4uYXBwLCBwbHVnaW4sIHNob3J0Y3V0KTtcclxuXHRcdHBsdWdpbi5zZXR0aW5ncy5zaG9ydGN1dHMucHVzaChzaG9ydGN1dCk7XHJcblx0fVxyXG59XHJcbiIsICJpbXBvcnQge0FwcCwgTW9kYWx9IGZyb20gXCJvYnNpZGlhblwiO1xyXG5pbXBvcnQge1Nob3J0Y3V0fSBmcm9tIFwiLi9TaG9ydGN1dFwiO1xyXG5pbXBvcnQgRG91Ymxlc2hpZnQgZnJvbSBcIi4vbWFpblwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEtleVNlbGVjdG9yIGV4dGVuZHMgTW9kYWx7XHJcblxyXG5cdHNob3J0Y3V0OiBTaG9ydGN1dDtcclxuXHRrZXk6IHN0cmluZztcclxuXHRwbHVnaW46IERvdWJsZXNoaWZ0O1xyXG5cdGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IERvdWJsZXNoaWZ0LCBzaG9ydGN1dDogU2hvcnRjdXQpIHtcclxuXHRcdHN1cGVyKGFwcCk7XHJcblx0XHR0aGlzLnBsdWdpbiA9IHBsdWdpbjtcclxuXHRcdHRoaXMuc2hvcnRjdXQgPSBzaG9ydGN1dDtcclxuXHRcdHRoaXMua2V5ID0gdGhpcy5zaG9ydGN1dC5rZXk7XHJcblx0fVxyXG5cclxuXHRvbk9wZW4oKSB7XHJcblx0XHRsZXQgeyBjb250ZW50RWwgfSA9IHRoaXM7XHJcblxyXG5cdFx0bGV0IGluc3RydWN0aW9uRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHRcdGluc3RydWN0aW9uRWwudGV4dENvbnRlbnQgPSAncHJlc3MgYW55IGtleSB0byBjaGFuZ2UgeW91ciBjdXJyZW50IG9uZS4gY2xvc2UgdGhpcyB3aW5kb3cgdG8gY2FuY2VsJztcclxuXHRcdGluc3RydWN0aW9uRWwuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG5cdFx0aW5zdHJ1Y3Rpb25FbC5zdHlsZS5sZWZ0ID0gJzEwMCc7XHJcblx0XHRpbnN0cnVjdGlvbkVsLnN0eWxlLnRvcCA9ICcxJztcclxuXHRcdGluc3RydWN0aW9uRWwuc3R5bGUuZm9udFNpemUgPSAnMTJweCc7XHJcblxyXG5cdFx0bGV0IHNoaWZ0RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xyXG5cdFx0c2hpZnRFbC50ZXh0Q29udGVudCA9IHRoaXMuc2hvcnRjdXQua2V5ID09PSBcIiBcIiA/IFwiU1BBQ0VcIiA6IHRoaXMuc2hvcnRjdXQua2V5LnRvVXBwZXJDYXNlKCk7XHJcblx0XHRzaGlmdEVsLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xyXG5cdFx0c2hpZnRFbC5zdHlsZS5wYWRkaW5nVG9wID0gJzUwcHgnO1xyXG5cdFx0c2hpZnRFbC5zdHlsZS5wYWRkaW5nQm90dG9tID0gJzUwcHgnO1xyXG5cclxuXHRcdGxldCBidXR0b25FbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG5cdFx0YnV0dG9uRWwudGV4dENvbnRlbnQgPSAnU2F2ZSc7XHJcblx0XHRidXR0b25FbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuXHRcdGJ1dHRvbkVsLnN0eWxlLm1hcmdpbiA9ICcwIGF1dG8nO1xyXG5cdFx0YnV0dG9uRWwudGFiSW5kZXggPSAtMTsgLy8gcHJldmVudCBjbG9zaW5nIHRoZSBtb2RhbCBpZiBTcGFjZSBvciBFbnRlciBpcyBiZWluZyBwcmVzc2VkXHJcblx0XHRidXR0b25FbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuc2F2ZSgpKTtcclxuXHJcblx0XHRjb250ZW50RWwuYXBwZW5kQ2hpbGQoaW5zdHJ1Y3Rpb25FbCk7XHJcblx0XHRjb250ZW50RWwuYXBwZW5kQ2hpbGQoc2hpZnRFbCk7XHJcblx0XHRjb250ZW50RWwuYXBwZW5kQ2hpbGQoYnV0dG9uRWwpO1xyXG5cclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZXZlbnQpID0+IHRoaXMuZGV0ZWN0S2V5cHJlc3MoZXZlbnQsIHNoaWZ0RWwpKTtcclxuXHR9XHJcblxyXG5cdHNhdmUoKSB7XHRcdHRoaXMuc2hvcnRjdXQua2V5ID0gdGhpcy5rZXk7XHJcblx0XHR0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuXHRcdHRoaXMucGx1Z2luLnNldHRpbmdzVGFiLmRpc3BsYXkoKTtcclxuXHRcdHRoaXMuY2xvc2UoKTtcclxuXHR9XHJcblxyXG5cdGRldGVjdEtleXByZXNzKGV2ZW50OiBLZXlib2FyZEV2ZW50LCBlbGVtZW50OiBIVE1MRWxlbWVudCkge1xyXG5cdFx0ZWxlbWVudC50ZXh0Q29udGVudCA9IGV2ZW50LmtleSA9PT0gXCIgXCIgPyBcIlNQQUNFXCIgOiBldmVudC5rZXkudG9VcHBlckNhc2UoKTtcclxuXHRcdHRoaXMua2V5ID0gZXZlbnQua2V5O1xyXG5cdH1cclxuXHJcblx0b25DbG9zZSgpIHtcclxuXHRcdGxldCB7IGNvbnRlbnRFbCB9ID0gdGhpcztcclxuXHRcdGxldCBidXR0b25FbCA9IGNvbnRlbnRFbC5xdWVyeVNlbGVjdG9yKCdidXR0b24nKTtcclxuXHRcdGxldCBzaGlmdEVsID0gY29udGVudEVsLnF1ZXJ5U2VsZWN0b3IoJ2gxJyk7XHJcblx0XHRidXR0b25FbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuc2F2ZSgpKTtcclxuXHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZXZlbnQpID0+IHRoaXMuZGV0ZWN0S2V5cHJlc3MoZXZlbnQsIHNoaWZ0RWwpKTtcclxuXHRcdGNvbnRlbnRFbC5lbXB0eSgpO1xyXG5cdH1cclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7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
