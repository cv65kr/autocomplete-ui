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
        ;

        state
            .client
            .search(query, (response, error) => {
                store.setState({
                    data: response
                });
            })
    },
});