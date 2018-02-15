import {h} from "preact"
import { connect } from 'unistore/preact'
import groupBy from 'lodash/groupBy'
import {
    buildPoweredBy,
    createDatasetByItemTypeAndSetActiveIndex,
    renderTemplate
} from "./helpers";

const defaultHtmlAttributes = {
    id: "apisearch-listbox",
    className: "as-result",
    role: "listbox",
    tabIndex: "-1"
};

/**
 * Result Component
 *
 * @param datasets
 * @param poweredBy
 * @param resultBoxOpen
 * @param currentCursorIndex
 * @param items
 * @returns {XML}
 * @constructor
 */
export const ResultComponent = ({
   datasets,
   poweredBy,
   resultBoxOpen,
   currentCursorIndex,
   items
}) => {
    /**
     * No results
     */
    if (false === resultBoxOpen) {
        return <div
            {...defaultHtmlAttributes}
            style={{display: 'none'}}
        />;
    }

    let filteredItemsByType = createDatasetByItemTypeAndSetActiveIndex(
        items,
        currentCursorIndex
    );
    let filteredDatasetsByType = groupBy(datasets, 'type');

    /**
     * Results set
     */
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
                        {filteredItemsByType[type].map((item, index) =>
                            <li
                                data-index={item.navigationIndex}
                                className={`as-result__datasetItem${
                                    item.isActive
                                        ? ' as-result__datasetItem--active'
                                        : ''
                                    }`}
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

            {buildPoweredBy(poweredBy)}
        </div>
    )
};

/**
 * Result connector
 */
const ConnectedResult = connect('datasets, poweredBy, resultBoxOpen, currentCursorIndex, items')(ResultComponent);

export default ConnectedResult;