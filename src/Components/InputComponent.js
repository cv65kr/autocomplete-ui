import {h} from "preact";
import {actions} from "../actions";
import { connect } from 'unistore/preact'

export const InputComponent = connect('', actions) (
    ({htmlNodeInheritProps, searchAction}) =>
        <input
            {...htmlNodeInheritProps}
            autocomplete="false"
            tabIndex="0"
            spellCheck="false"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded="false"
            aria-owns="apisearch-listbox"
            data-search="Apisearch-autocomplete"
            onInput={event => searchAction(event.target.value)}
        />
);