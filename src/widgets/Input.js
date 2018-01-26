import {h, render} from "preact"
import { Provider } from 'unistore/preact'
import {InputComponent} from "../Components/InputComponent"

export default class Input {
    constructor(target, store) {
        this.target = target;
        this.store = store;
    }

    render() {
        let targetNode = document.querySelector(this.target);

        render(
            <Provider store={this.store}>
                <InputComponent />
            </Provider>,
            targetNode
        );
    }
}