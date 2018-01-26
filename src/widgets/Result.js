import {h, render} from "preact"
import { Provider } from 'unistore/preact'
import {ResultComponent} from "../Components/ResultComponent";

export default class Result {
    constructor(target, store) {
        this.target = target;
        this.store = store;
    }

    render() {
        let targetNode = document.querySelector(this.target);

        render(
            <Provider store={this.store}>
                <ResultComponent />
            </Provider>,
            targetNode
        );
    }
}