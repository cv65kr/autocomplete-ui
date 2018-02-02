import {h} from "preact"
import { connect } from 'unistore/preact'
import Hogan from 'hogan.js'
import groupBy from 'lodash/groupBy'
import {sortBy} from "lodash";

const defaultHtmlAttributes = {
    id: "apisearch-listbox",
    className: "as-result",
    role: "listbox",
    tabIndex: "-1"
};

/**
 * Suggested Search Component
 */
export const ResultComponent = connect(
    'datasets, poweredBy, resultBoxOpen, currentCursorIndex, items'
)(
    ({
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

/**
 * Set active index
 *
 * @param items
 * @param currentCursorIndex
 * @returns {{}}
 */
const createDatasetByItemTypeAndSetActiveIndex = (
    items,
    currentCursorIndex
) => {
    let sortedItemsByType = sortBy(items, 'uuid.type');
    let itemsWithActiveIndex = sortedItemsByType.map((item, index) =>
        ({
            ...item,
            navigationIndex: (index + 1),
            isActive: ((index + 1) === currentCursorIndex)
        })
    );

    return groupBy(itemsWithActiveIndex, 'uuid.type');
};

/**
 * Build the poweredBy icon
 * It can be a boolean:
 *   if (false) do now show a poweredBy
 *   if (true) assign the default poweredBy
 *   else render a custom poweredBy template string
 *
 * @param poweredBy
 * @returns {XML}
 */
const buildPoweredBy = (poweredBy = false) => {
    if (false === poweredBy) return null;

    if (true === poweredBy) {
        poweredBy = `<a href="http://apisearch.io">
            <img 
                src="http://apisearch.io/assets/media/powered-by.svg" 
                alt="Powered by Apisearch" 
                width="100px"
            />
        </a>`;
    }

    return <div
        className="as-poweredBy"
        dangerouslySetInnerHTML={
            renderTemplate(poweredBy, null)
        }
    />
};