/**
 * Mocked actions file
 *
 * @param store
 */
import {resultWithItems} from "./result.mock";

export const actions = store => ({
    searchAction(state, event) {
        store.setState({
            ...resultWithItems,
            queryText: event.target.value
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