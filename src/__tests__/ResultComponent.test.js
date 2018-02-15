import {h} from 'preact';
import {shallow} from 'preact-render-spy'
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

describe('<ResultComponent />', () => {
    it('should render', () => {
        const tree = shallow(
            <ResultComponent />
        );

        /**
         * Expect initial store state
         */
        expect(tree).toMatchSnapshot();
    });
});