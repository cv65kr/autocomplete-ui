import {h, render} from "preact"
import { Provider } from 'unistore/preact'
import {InputComponent} from "./Components/InputComponent"
import {ResultComponent} from "./Components/ResultComponent"
import {createResultContainer, getNodeAttributes} from './helpers'

/**
 * Render Input widget
 * @param target
 * @param store
 */
export const renderInput = ({
    target,
    store
}) => {
    let targetNode = document.querySelector(target);
    let parentNode = targetNode.parentNode;

    render(
        <Provider store={store}>
            <InputComponent htmlNodeInheritProps={
                getNodeAttributes(targetNode)
            } />
        </Provider>,
        parentNode,
        parentNode.childNodes[0]
    );

    targetNode.remove();
};

/**
 * Render Result widget
 * @param target
 * @param store
 * @param template
 */
export const renderResult = ({
    target,
    store,
    datasets
}) => {
    let targetNode = document.querySelector(target);
    let parentNode = targetNode.parentNode;
    let index = getTargetIndex(targetNode);

    render(
        <Provider store={store}>
            <ResultComponent
                datasets={datasets}
            />
        </Provider>,
        parentNode,
        parentNode.childNodes[index + 1]
    );
};

/**
 * Get target index relative to its parent
 *
 * @param targetNode
 * @returns {*}
 */
function getTargetIndex(targetNode) {
    return Array.prototype.indexOf.call(
        targetNode.parentNode.children,
        targetNode
    );
}