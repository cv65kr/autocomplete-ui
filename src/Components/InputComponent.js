import {h} from "preact";
import {actions} from "../actions";
import { connect } from 'unistore/preact'

export const InputComponent = connect('', actions) (
    ({htmlNodeInheritProps, searchAction}) =>
        <input
            {...htmlNodeInheritProps}
            autocomplete="false"
            spellCheck="false"
            data-search="Apisearch-autocomplete"
            onInput={event => searchAction(event.target.value)}
        />
);