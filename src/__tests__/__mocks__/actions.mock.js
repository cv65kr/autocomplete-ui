/**
 * Mocked actions file
 *
 * @param store
 */
export const actions = store => ({
    searchAction(state, event) {
        store.setState({
            items: [
                {
                    uuid: {
                        id: 1,
                        type: 'mock'
                    },
                    metadata: {
                        name: 'This is a mocked item'
                    }
                }, {
                    uuid: {
                        id: 2,
                        type: 'mock'
                    },
                    metadata: {
                        name: 'This is a mocked item 2'
                    }
                }, {
                    uuid: {
                        id: 3,
                        type: 'mock'
                    },
                    metadata: {
                        name: 'This is a mocked item 3'
                    }
                },
            ],
            total_hits: 3,
            resultBoxOpen: true,
            queryText: event.target.value,
            currentCursorIndex: 0
        });
    },

    keyDownAction(state) {
        let currentIndex = state.currentCursorIndex;
        let visibleHits = state.items.length;

        return {
            currentCursorIndex: (currentIndex < visibleHits)
                ? currentIndex + 1
                : 0
        };
    },

    focusOutAction() {
        return { resultBoxOpen: false };
    }
});