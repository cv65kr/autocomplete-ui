import apisearch from "apisearch";
import { Query } from "apisearch/lib/Query/Query";

/**
 * Keyboard keys
 * @type {{up: string, down: string, esc: string, enter: string}}
 */
const key = {
    up: 'ArrowUp',
    down: 'ArrowDown',
    esc: 'Escape',
    enter: 'Enter'
};

/**
 * Actions
 */
export const actions = store => ({
    /**
     * Search Action
     *
     * @param state
     * @param event
     */
    searchAction(state, event) {
        let queryText = event.target.value;
        let datasetKeys = state
            .datasets
            .map(dataset => dataset.type)
        ;

        /**
         * Compose query
         */
        let query = Query.create(queryText, 1, state.itemsPerResult)
            .filterByTypes(datasetKeys)
            .enableHighlights()
        ;

        /**
         * Empty query OR
         * Query length smaller than min keywords
         */
        if (
            query.getQueryText === '' ||
            query.getQueryText.length < state.startSearchOn
        ) {
            store.setState({resultBoxOpen: false});
            event.target.setAttribute('aria-expanded', 'false');
            return;
        }

        /**
         * Search data
         */
        state
            .client
            .query(query)
            .then(result => {

                let totalHits = result.totalHits;

                if (totalHits === 0) {
                    store.setState({
                        total_hits: 0,
                        resultBoxOpen: false,
                        currentCursorIndex: 0
                    });
                    event.target.setAttribute('aria-expanded', 'false');

                    return;
                }

                store.setState({
                    items: result.items,
                    total_hits: totalHits,
                    resultBoxOpen: true,
                    currentCursorIndex: 0
                });

                event.target.setAttribute('aria-expanded', 'true');
            })
            .catch(error => {
                
                store.setState({
                    error,
                    resultBoxOpen: false,
                    currentCursorIndex: 0
                });

                event.target.setAttribute('aria-expanded', 'false');
            });
    },

    /**
     * On key down action
     * Navigation, enter and scape key
     *
     * @param state
     * @param event
     * @returns {*}
     */
    keyDownAction(state, event) {
        if (event.code === key.enter) {
            if (state.currentCursorIndex !== 0) {
                event.preventDefault();

                /**
                 * Select an anchor inside the targeted element
                 */
                document
                    .querySelector(`li[data-index='${state.currentCursorIndex}'] a`)
                    .click()
            }
        }

        if (event.code === key.esc) {
            return {
                resultBoxOpen: false,
                currentCursorIndex: 0
            };
        }

        if (event.code === key.down) {
            let currentIndex = state.currentCursorIndex;
            let visibleHits = state.items.length;

            return {
                currentCursorIndex: (currentIndex < visibleHits)
                    ? currentIndex + 1
                    : 0
            };
        }

        if (event.code === key.up) {
            /**
             * Prevent cursor to go at the starting point of the line
             */
            event.preventDefault();

            let currentIndex = state.currentCursorIndex;
            let visibleHits = state.items.length;
            return {
                currentCursorIndex: (currentIndex > 0)
                    ? currentIndex - 1
                    : visibleHits
            };
        }
    },

    /**
     * Focus lost
     *
     * @param state
     * @param event
     */
    focusOutAction({}, event) {
        if (
            null === event.relatedTarget ||
            false === event.relatedTarget.id === 'apisearch-listbox'
        ) {
            event.target.setAttribute('aria-expanded', 'false');
            return { resultBoxOpen: false };
        }
    }
});