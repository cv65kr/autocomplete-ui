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
            .enableHighlights()
        ;

        state
            .client
            .search(query, (data, error) => {
                if (error) {
                    store.setState({error});
                    return;
                }

                store.setState({data});
            })
    },
});