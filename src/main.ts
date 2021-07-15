import { DomNode, el } from "@hanul/skynode";
import VBTCBar from "./VBTCBar";
import PizzaList from "./PizzaList";
import VirtualBitcoinContract from "./ethereum/VirtualBitcoinContract";
import { BigNumber } from "@ethersproject/bignumber";

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
