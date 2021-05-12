import { DomNode } from "@hanul/skynode";
import VBTCBar from "./VBTCBar";

const main = new DomNode(document.querySelector("main")!);

new VBTCBar().appendTo(main);