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
     * @param queryText
     */
    searchAction(state, queryText) {
        let query = state
            .client
            .query
            .create(queryText)
            .filterByTypes(state.datasetKeys)
            .enableHighlights()
        ;

        if (query.q === '') {
            store.setState({resultBoxOpen: false});
            return;
        }

        state
            .client
            .search(query, (data, error) => {
                if (error) {
                    store.setState({ error, resultBoxOpen: false });
                    return;
                }
                if (data.total_hits === 0) {
                    store.setState({
                        total_hits: 0,
                        resultBoxOpen: false
                    });
                    return;
                }

                store.setState({
                    items: data.items,
                    total_hits: data.total_hits,
                    resultBoxOpen: true
                });
            })
    },

    keyDownAction(state, event) {

        if (event.code === key.esc) {
            store.setState({ resultBoxOpen: false });
            return;
        }

        if (event.code === key.down) {
            console.log('Down')
        }

        if (event.code ===  key.up) {
            /*
             * Prevent cursor to go at the starting point of the line
             */
            event.preventDefault();

            console.log('Up')
        }

        if (event.code ===  key.enter) {
            console.log('enter');
        }
    },

    /**
     * Focus lost
     *
     * @param state
     * @param event
     */
    focusOutAction(state, event) {
        if (
            null === event.relatedTarget ||
            false === event.relatedTarget.id === 'apisearch-listbox'
        ) {
            store.setState({ resultBoxOpen: false });
        }
    }
});