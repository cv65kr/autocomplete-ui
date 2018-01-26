import apisearch from "apisearch";
import Input from "./widgets/Input";
import Result from "./widgets/Result";
import createStore from 'unistore';


module.exports = function(
    target,
    {
        appId,
        indexId,
        token
    }
) {
    ensureTargetIsDefined(target);

    /**
     * compose store
     */
    let store = createStore({
        data: {},
        client: apisearch({appId, indexId, token})
    });

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

