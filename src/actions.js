/**
 * Actions
 */
export const actions = store => ({
    /**
     * Search Action
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
                    store.setState({ resultBoxOpen: false });
                    return;
                }

                store.setState({ data, resultBoxOpen: true });
            })
    },
});