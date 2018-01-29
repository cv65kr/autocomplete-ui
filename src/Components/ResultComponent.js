import {h} from "preact"
import {actions} from "../actions"
import { connect } from 'unistore/preact'
import Hogan from 'hogan.js'
import groupBy from 'lodash/groupBy'

const defaultHtmlAttributes = {
    id: "apisearch-listbox",
    className: "as-result",
    role: "listbox",
    tabIndex: "-1"
};

/**
 * Suggested Search Component
 */
export const ResultComponent = connect('resultBoxOpen, items')(
    ({
         /** component props */
         datasets,

         /** store props */
         items,
         resultBoxOpen
    }) => {
        if (false === resultBoxOpen) {
            return <div
                {...defaultHtmlAttributes}
                style={{display: 'none'}}
            />;
        }

        let filteredItemsByType = groupBy(items, 'uuid.type');
        let filteredDatasetsByType = groupBy(datasets, 'type');

        return (
            <div
                {...defaultHtmlAttributes}
            >
                {Object.keys(filteredItemsByType).map(type =>
                    <div
                        className={`as-result__dataset as-result__dataset--${type}`}
                    >
                        {(filteredDatasetsByType[type][0].template.header)
                            ? <div
                                className="as-result__datasetHeader"
                                dangerouslySetInnerHTML={
                                    renderTemplate(
                                        filteredDatasetsByType[type][0].template.header,
                                        null
                                    )
                                }
                            />
                            : null
                        }

                        <ul
                            className="as-result__datasetItemsList"
                        >
                            {filteredItemsByType[type].map(item =>
                                <li
                                    className="as-result__datasetItem"
                                    tabIndex={-1}
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