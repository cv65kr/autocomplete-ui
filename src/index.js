import {h} from "preact";
import apisearch from "apisearch";
import createStore from 'unistore';
import {renderInput, renderResult} from "./render";


module.exports = function(client)
{
    const clientInstance = apisearch(client);

    return ({ inputTarget, datasets }) => {
        ensureTargetIsDefined(inputTarget);

        /**
         * Compose initial state
         */
        let initialState = {
            client: clientInstance,
            datasetKeys: datasets.map(dataset => dataset.type),
            resultBoxOpen: false,
            currentCursorIndex: 0,
            items: [],
            total_hits: 0
        };

        /**
         * compose store
         */
        let store = createStore(initialState);

        /**
         * Render Input
         */
        renderInput({
            store,
            target: inputTarget
        });

        /**
         * Render Result
         */
        renderResult({
            store,
            datasets,
            target: inputTarget
        });
    }
};

const ensureTargetIsDefined = function(targetNode) {
    if (typeof targetNode === 'undefined') {
        throw new Error('A valid DOM target must be defined.');
    }
};