import {h} from "preact"
import {actions} from "../actions"
import { connect } from 'unistore/preact'
import Hogan from 'hogan.js'
import groupBy from 'lodash/groupBy'

/**
 * Suggested Search Component
 */
export const ResultComponent = connect('data')(
    ({datasets, data}) => {
        if (data.total_hits === 0) {
            return null;
        }

        let filteredItemsByType = groupBy(data.items, 'uuid.type');

        return (
            <div>
                {datasets.map(dataset =>
                    <ul>
                        {(dataset.template.header)
                            ? <li
                                dangerouslySetInnerHTML={{
                                    __html: renderTemplate(
                                        dataset.template.header,
                                        null
                                    )
                                }}
                            />
                            : null
                        }
                        {data.items.map(item =>
                            (item.uuid.type === dataset.type)
                                ? <li
                                    dangerouslySetInnerHTML={{
                                        __html: renderTemplate(
                                            dataset.template.item,
                                            item
                                        )
                                    }}
                                />
                                : null
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