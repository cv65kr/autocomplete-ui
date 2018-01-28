import {h} from "preact"
import {actions} from "../actions"
import { connect } from 'unistore/preact'
import Hogan from 'hogan.js'

/**
 * Suggested Search Component
 */
export const ResultComponent = connect('template, data')(
    ({template, data}) => (
        <div dangerouslySetInnerHTML={{
            __html: renderTemplate(template, data)
        }} />
    )
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