import ObjectPhone from "../../components/modal/object";
import ModalPhone from "../../components/modal/phone";
import MainAsk from "./components/ask";
import MainClient from "./components/client";
import MainCost from "./components/cost";
import MainHouse from "./components/house";

class MainPage {
    constructor() {
        this.init();
    }

    init() {
        jcore.dataHref()
        jcore.mask.phone($('.main-preview input').get());

        new MainCost();
        new MainAsk();
        new MainHouse();
        new MainClient();

        new ModalPhone({
            $inputForPhone: $('.main-preview input')
        });
        new ObjectPhone();
    }
}

window.mainPage = new MainPage();