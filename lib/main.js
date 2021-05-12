"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const VBTCBar_1 = __importDefault(require("./VBTCBar"));
const main = new skynode_1.DomNode(document.querySelector("main"));
new VBTCBar_1.default().appendTo(main);
//# sourceMappingURL=main.js.map