import {h} from 'preact';
import {shallow} from 'preact-render-spy'
import {ResultComponent} from '../components/ResultComponent';
import {resultWithItems} from "./__mocks__/result.mock";

const datasets = [
    {
        type: 'mock',
        template: {
            header: '<h3>Mock Dataset</h3>',
            item: '<p>{{metadata.name}}</p>'
        }
    }
];

describe('<ResultComponent />', () => {
    let tree;

    beforeEach(() => {
        tree = shallow(
            <ResultComponent
                datasets={datasets}
                resultBoxOpen={false}
                poweredBy={false}
            />
        );
    });

    it('should render initial state', () => {
        expect(tree).toMatchSnapshot();
    });

    it('should render results and navigate', () => {
        tree.render(<ResultComponent
            datasets={datasets}
            poweredBy={true}
            {...resultWithItems}
        />);
        expect(tree).toMatchSnapshot();

        tree.render(<ResultComponent
            datasets={datasets}
            poweredBy={true}
            {...resultWithItems}
            currentCursorIndex={2}
        />);
        expect(tree).toMatchSnapshot();
    });
});