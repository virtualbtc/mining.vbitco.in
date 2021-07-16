import { BigNumber } from "@ethersproject/bignumber";
import { DomNode, el } from "@hanul/skynode";
import VirtualBitcoinContract from "./contracts/VirtualBitcoinContract";
import PizzaList from "./PizzaList";
import VBTCBar from "./VBTCBar";

const main = new DomNode(document.querySelector("main")!);

main.append(
    new VBTCBar(),
    el(".pizza-price", "1 Pizza = 10,000 VBTC"),
    el(".menu",
        el("a", "Buy Pizza", {
            click: async () => {
                const power = prompt("Please enter power of Pizza.", String(1));
                await VirtualBitcoinContract.buyPizza(BigNumber.from(power));
            },
        }),
    ),
    new PizzaList(),
);
