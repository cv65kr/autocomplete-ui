import apisearch from "apisearch";
import Input from "./widgets/Input";
import Result from "./widgets/Result";
import createStore from 'unistore';


module.exports = function(
    target,
    {
        appId,
        indexId,
        token,
        options
    }
) {
    ensureTargetIsDefined(target);

    /**
     * Compose initial state
         */
    let initialState = {
        data: {},
        template: defaultTemplate,
        client: apisearch({appId, indexId, token, options})
    };

    /**
     * compose store
     */
    let store = createStore(initialState);

    const input = new Input(target, store);
    input.render();

    const result = new Result('.result', store);
    result.render();
};

const ensureTargetIsDefined = function(targetNode) {
    if (typeof targetNode === 'undefined') {
        throw new Error('A valid DOM target must be defined.');
    }
};

const defaultTemplate = '<ul>{{#items}}<li><a href="{{metadata.url}}" title="{{metadata.title}}">{{#highlights.title}}{{highlights.title}}{{/highlights.title}}{{^highlights.title}}{{metadata.title}}{{/highlights.title}}</a></li>{{/items}}</ul>';

