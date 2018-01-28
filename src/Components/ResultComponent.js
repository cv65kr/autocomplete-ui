import {h} from "preact"
import {actions} from "../actions"
import { connect } from 'unistore/preact'
import Hogan from 'hogan.js'

/**
 * Suggested Search Component
 */
export const ResultComponent = connect('data')(
    ({datasets, data}) => {
        if (data.total_hits === 0) {
            return null;
        }

        return (
            <div>
                {datasets.map(dataset =>
                    <ul>
                        {data.items.map(item =>
                            <li
                                dangerouslySetInnerHTML={{
                                    __html: renderTemplate(
                                        dataset.template.item,
                                        item
                                    )
                                }}
                            />
                        )}
                    </ul>
                )}
            </div>
        )
    }
);

/**
 * Compile template
 * @param template
 * @param data
 */
const renderTemplate = (template, data) => {
    let compiledTemplate = Hogan.compile(template);
    return compiledTemplate.render(data);
};