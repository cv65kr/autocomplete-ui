/**
 * Set of helpers for the suggestions widget
 */

/**
 * Returns an object of an
 * html node attributes.
 *
 * @param htmlNode
 * @returns {{}}
 */
export const getNodeAttributes = (htmlNode) => {
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
};

/**
 * Create Result container
 * @returns {Element}
 */
export const createResultContainer = () => {
    // select input container
    let inputNode = document.querySelector('input[data-search="Apisearch-autocomplete"]');

    // create container node
    let resultNode = document.createElement('div');
    resultNode.className = 'apisearch-result-container';

    inputNode.parentNode.insertBefore(resultNode, inputNode.nextSibling);

    return resultNode;
};

/**
 * Mark as active the item next
 * to the last active item
 * on a given array of items
 *
 * @example when a user press a key arrow down
 */
export function selectNextSuggestion(suggestionsArray) {
    let currentActiveSuggestionKey;

    return suggestionsArray.map((suggestion, key) => {
        /**
         * Detect current active suggestion
         */
        if (
            suggestion.isActive &&
            key + 1 < suggestionsArray.length
        ) {
            currentActiveSuggestionKey = key;
            suggestion.isActive = false;
        }

        /**
         * Modify the first suggestion next to
         * the current active suggestion
         */
        if (
            key === currentActiveSuggestionKey + 1 &&
            key + 1 <= suggestionsArray.length
        ) {
            suggestion.isActive = true;
        }

        return suggestion;
    });
}

/**
 * Mark as active the item previous
 * to the last active item
 * on a given array of items
 *
 * @example when a user press a key arrow up
 */
export function selectPreviousSuggestion(suggestionsArray) {
    /**
     * Find the current active suggestion key
     */
    let currentActiveSuggestionKey = suggestionsArray
        .findIndex((suggestion) => {
            if (suggestion.isActive) {
                return suggestion;
            }
        });

    return suggestionsArray.map((suggestion, key) => {
        /**
         * Set the current active suggestion as false
         * if is Active AND is not the last one
         */
        if (
            suggestion.isActive &&
            currentActiveSuggestionKey - 1 >= 0
        ) {
            suggestion.isActive = false;
        }

        /**
         * Set active the suggestion previous to
         * the current active suggestion
         */
        if (
            currentActiveSuggestionKey -1 === key &&
            currentActiveSuggestionKey - 1 >= 0
        ) {
            suggestion.isActive = true;
        }

        return suggestion;
    });
}

/**
 * Return the active item of an array
 */
export function selectActiveSuggestion(suggestionsArray) {
    let selectedSuggestion = suggestionsArray
        .filter(suggestion => {
            if (suggestion.isActive) {
                return suggestion;
            }
        });

    return selectedSuggestion[0].name;
}