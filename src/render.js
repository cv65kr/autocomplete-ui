import {h, render} from "preact"
import { Provider } from 'unistore/preact'
import {InputComponent} from "./Components/InputComponent"
import {ResultComponent} from "./Components/ResultComponent"

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
    let index = getTargetIndex(targetNode);

    render(
        <Provider store={store}>
            <InputComponent htmlNodeInheritProps={
                getNodeAttributes(targetNode)
            } />
        </Provider>,
        parentNode,
        parentNode.children[index]
    );
};

/**
 * Render Result widget
 * @param target
 * @param store
 * @param template
 */
export const renderResult = ({
    target,
    store
}) => {
    let targetNode = document.querySelector(target);
    let parentNode = targetNode.parentNode;

    // Create a temporary DIV to place
    // the result-box on it
    let tempContainer = document.createElement('DIV');
    parentNode.insertBefore(tempContainer, targetNode.nextSibling);
    let index = getTargetIndex(tempContainer);

    render(
        <Provider store={store}>
            <ResultComponent />
        </Provider>,
        parentNode,
        parentNode.children[index]
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

/**
 * Returns an object of an
 * html node attributes.
 *
 * @param htmlNode
 * @returns {{}}
 */
function getNodeAttributes(htmlNode) {
    let nodeAttributes = {};
    for (let i = 0; i < htmlNode.attributes.length; i++) {
        let attr = htmlNode.attributes[i];
        if (attr.specified) {
            nodeAttributes = {
                ...nodeAttributes,
                [attr.name]: attr.value
            }
        }
    }

    return nodeAttributes;
}