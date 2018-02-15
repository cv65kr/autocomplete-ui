import {h} from 'preact';
import {shallow} from 'preact-render-spy'
import {InputComponent} from '../components/InputComponent';

const datasets = [
    {
        type: 'mock',
        template: {
            header: '<h3>Mock Dataset</h3>',
            item: '<p>{{metadata.name}}</p>'
        }
    }
];

describe('<InputComponent />', () => {
    it('should render', () => {
        const tree = shallow(
            <InputComponent htmlNodeInheritProps={{
                id: 'apisearch-input-id',
                class: 'some-class-name'
            }} />
        );

        /**
         * Expect initial store state
         */
        expect(tree).toMatchSnapshot();
    });
});