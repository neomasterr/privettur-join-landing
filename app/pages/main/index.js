import ObjectPhone from "../../components/modal/object";
import ModalPhone from "../../components/modal/phone";
import MainAsk from "./components/ask";
import MainClient from "./components/client";
import MainCost from "./components/cost";
import MainHouse from "./components/house";
import MainPreview from "./components/preview";

class MainPage {
    constructor() {
        this.init();
    }

    init() {
        jcore.dataHref()

        new MainPreview();
        // отключаем на 30 дней
        // new MainCost();
        new MainAsk();
        new MainHouse();
        new MainClient();

        new ModalPhone({
            $inputForPhone: $('.main-preview input')
        });

        const modalObject = new ObjectPhone();
        document.querySelectorAll('[data-modal-target="object"][data-index]').forEach(($button) => {
            $button.addEventListener('click', e => {
                modalObject.select($button.dataset.index);
            });
        });
    }
}

window.mainPage = new MainPage();
