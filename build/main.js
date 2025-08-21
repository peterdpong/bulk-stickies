var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/.pnpm/@create-figma-plugin+utilities@4.0.2/node_modules/@create-figma-plugin/utilities/lib/events.js
function on(name, handler) {
  const id = `${currentId}`;
  currentId += 1;
  eventHandlers[id] = { handler, name };
  return function() {
    delete eventHandlers[id];
  };
}
function invokeEventHandler(name, args) {
  let invoked = false;
  for (const id in eventHandlers) {
    if (eventHandlers[id].name === name) {
      eventHandlers[id].handler.apply(null, args);
      invoked = true;
    }
  }
  if (invoked === false) {
    throw new Error(`No event handler with name \`${name}\``);
  }
}
var eventHandlers, currentId;
var init_events = __esm({
  "node_modules/.pnpm/@create-figma-plugin+utilities@4.0.2/node_modules/@create-figma-plugin/utilities/lib/events.js"() {
    eventHandlers = {};
    currentId = 0;
    if (typeof window === "undefined") {
      figma.ui.onmessage = function(args) {
        if (!Array.isArray(args)) {
          return;
        }
        const [name, ...rest] = args;
        if (typeof name !== "string") {
          return;
        }
        invokeEventHandler(name, rest);
      };
    } else {
      window.onmessage = function(event) {
        if (typeof event.data.pluginMessage === "undefined") {
          return;
        }
        const args = event.data.pluginMessage;
        if (!Array.isArray(args)) {
          return;
        }
        const [name, ...rest] = event.data.pluginMessage;
        if (typeof name !== "string") {
          return;
        }
        invokeEventHandler(name, rest);
      };
    }
  }
});

// node_modules/.pnpm/@create-figma-plugin+utilities@4.0.2/node_modules/@create-figma-plugin/utilities/lib/node/load-fonts-async.js
async function loadFontsAsync(nodes) {
  const result = {};
  for (const node of nodes) {
    switch (node.type) {
      case "CONNECTOR":
      case "SHAPE_WITH_TEXT":
      case "STICKY": {
        collectFontsUsedInNode(node.text, result);
        break;
      }
      case "TEXT": {
        collectFontsUsedInNode(node, result);
        break;
      }
    }
  }
  await Promise.all(Object.values(result).map(function(font) {
    return figma.loadFontAsync(font);
  }));
}
function collectFontsUsedInNode(node, result) {
  const length = node.characters.length;
  if (length === 0) {
    const fontName = node.fontName;
    const key = createKey(fontName);
    if (key in result) {
      return;
    }
    result[key] = fontName;
    return;
  }
  let i = -1;
  while (++i < length) {
    const fontName = node.getRangeFontName(i, i + 1);
    const key = createKey(fontName);
    if (key in result) {
      continue;
    }
    result[key] = fontName;
  }
}
function createKey(fontName) {
  return `${fontName.family}-${fontName.style}`;
}
var init_load_fonts_async = __esm({
  "node_modules/.pnpm/@create-figma-plugin+utilities@4.0.2/node_modules/@create-figma-plugin/utilities/lib/node/load-fonts-async.js"() {
  }
});

// node_modules/.pnpm/@create-figma-plugin+utilities@4.0.2/node_modules/@create-figma-plugin/utilities/lib/ui.js
function showUI(options, data) {
  if (typeof __html__ === "undefined") {
    throw new Error("No UI defined");
  }
  const html = `<div id="create-figma-plugin"></div><script>document.body.classList.add('theme-${figma.editorType}');const __FIGMA_COMMAND__='${typeof figma.command === "undefined" ? "" : figma.command}';const __SHOW_UI_DATA__=${JSON.stringify(typeof data === "undefined" ? {} : data)};${__html__}</script>`;
  figma.showUI(html, __spreadProps(__spreadValues({}, options), {
    themeColors: typeof options.themeColors === "undefined" ? true : options.themeColors
  }));
}
var init_ui = __esm({
  "node_modules/.pnpm/@create-figma-plugin+utilities@4.0.2/node_modules/@create-figma-plugin/utilities/lib/ui.js"() {
  }
});

// node_modules/.pnpm/@create-figma-plugin+utilities@4.0.2/node_modules/@create-figma-plugin/utilities/lib/index.js
var init_lib = __esm({
  "node_modules/.pnpm/@create-figma-plugin+utilities@4.0.2/node_modules/@create-figma-plugin/utilities/lib/index.js"() {
    init_events();
    init_load_fonts_async();
    init_ui();
  }
});

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => main_default
});
function main_default() {
  const MAX_STICKIES_PER_ROW = 5;
  const STICKY_SPACING = 20;
  const STICKY_SIZE_DEFAULT = 240;
  async function handleCreateBulkStickies(stickies) {
    const startPosition = figma.viewport.center;
    let placementPosition = startPosition;
    let currentNumInRow = 1;
    for (const stickyContents of stickies) {
      const newSticky = figma.createSticky();
      await loadFontsAsync([newSticky]);
      const newStickyText = newSticky.text;
      newStickyText.characters = stickyContents;
      newSticky.x = placementPosition.x;
      newSticky.y = placementPosition.y;
      let newXPosition = placementPosition.x + STICKY_SIZE_DEFAULT + STICKY_SPACING;
      let newYPosition = placementPosition.y;
      if (currentNumInRow == MAX_STICKIES_PER_ROW) {
        newYPosition += STICKY_SIZE_DEFAULT + STICKY_SPACING;
        currentNumInRow = 1;
        newXPosition = startPosition.x;
      } else {
        currentNumInRow++;
      }
      placementPosition = { x: newXPosition, y: newYPosition };
    }
  }
  on("createBulkStickies", handleCreateBulkStickies);
  showUI({
    height: 320,
    width: 280
  });
}
var init_main = __esm({
  "src/main.ts"() {
    "use strict";
    init_lib();
  }
});

// <stdin>
var modules = { "src/main.ts--default": (init_main(), __toCommonJS(main_exports))["default"] };
var commandId = true ? "src/main.ts--default" : figma.command;
modules[commandId]();
