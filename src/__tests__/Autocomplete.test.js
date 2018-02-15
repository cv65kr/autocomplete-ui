import {h} from 'preact';
import {render} from 'preact'
import {actions} from "./__mocks__/actions.mock";
import createStore from "unistore";
import { connect, Provider } from 'unistore/preact'
import {InputComponent} from '../components/InputComponent';
import {ResultComponent} from '../components/ResultComponent';

const datasets = [
    {
        type: 'mock',
        template: {
            header: '<h3>Mock Dataset</h3>',
            item: '<p>{{metadata.name}}</p>'
        }
    }
];

describe('Autocomplete', () => {
    let initialState = {
        poweredBy: false,
        datasets,
        itemsPerResult: 10,
        startSearchOn: 0,
        queryText: "",
        resultBoxOpen: false,
        currentCursorIndex: 0,
        items: [],
        total_hits: 0
    };

    let onInputEvent = new Event('input', {
        'bubbles': true,
        'cancelable': true
    });
    let onKeydownEvent = new KeyboardEvent('keydown', {
        'bubbles': true,
        'cancelable': true
    });
    let onBlurEvent = new KeyboardEvent('blur', {
        'bubbles': true,
        'cancelable': true
    });

    it('should render', () => {
        const ConnectedInput = connect('', actions)(InputComponent);
        const ConnectedResult = connect('datasets, poweredBy, resultBoxOpen, currentCursorIndex, items', actions)(ResultComponent);
        const store = createStore(initialState);

        /**
         * Render autocomplete
         */
        let root = document.createElement('div');
        render(
            <Provider store={store}>
                <ConnectedInput htmlNodeInheritProps={{
                    id: 'apisearch-input-id',
                    class: 'some-class-name'
                }}/>
                <ConnectedResult />
            </Provider>,
            root
        );

        /**
         * Expect initial store state
         */
        expect(store.getState()).toMatchSnapshot();

        /**
         * Searching on input --> "some query text"
         * Expect results on store state
         */
        root.firstElementChild.value = 'some query text';
        root.firstElementChild.dispatchEvent(onInputEvent);
        expect(store.getState()).toMatchSnapshot();

        /**
         * KeyDown action to change the cursor index
         */
        root.firstElementChild.dispatchEvent(onKeydownEvent);
        expect(store.getState()).toMatchSnapshot();

        /**
         * Focus out action
         */
        root.firstElementChild.dispatchEvent(onBlurEvent);
        expect(store.getState()).toMatchSnapshot();
    });
});
