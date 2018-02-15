import {h} from "preact";
import {groupBy, sortBy} from "lodash";
import Hogan from "hogan.js";


/**
 * Compile template
 * @param template
 * @param data
 */
export const renderTemplate = (template, data) => {
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
export const createDatasetByItemTypeAndSetActiveIndex = (
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
export const buildPoweredBy = (poweredBy = false) => {
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