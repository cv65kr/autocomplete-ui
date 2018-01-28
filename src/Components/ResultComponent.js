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
        if (data.total_hits === 0 || data.query.q === '') {
            return null;
        }

        let filteredItemsByType = groupBy(data.items, 'uuid.type');
        let filteredDatasetsByType = groupBy(datasets, 'type');

        return (
            <div>
                {Object.keys(filteredItemsByType).map(type =>
                    <div>
                        {(filteredDatasetsByType[type][0].template.header)
                            ? <div
                                dangerouslySetInnerHTML={
                                    renderTemplate(
                                        filteredDatasetsByType[type][0].template.header,
                                        null
                                    )
                                }
                            />
                            : null
                        }

                        <ul>
                            {filteredItemsByType[type].map(item =>
                                <li
                                    dangerouslySetInnerHTML={
                                        renderTemplate(
                                            filteredDatasetsByType[type][0].template.item,
                                            item
                                        )
                                    }
                                />
                            )}
                        </ul>
                    </div>
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

    return {
        __html: compiledTemplate.render(data)
    }
};