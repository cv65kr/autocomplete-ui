import {h} from "preact";
import {actions} from "../actions";
import { connect } from 'unistore/preact'

export const InputComponent = connect('resultBoxOpen', actions) (
    ({
         /** component props */
        htmlNodeInheritProps,

        /** store props */
        resultBoxOpen,

        /** actions */
        searchAction,
        keyDownAction,
        focusOutAction
    }) =>
        <input
            {...htmlNodeInheritProps}
            autocomplete="false"
            tabIndex="0"
            spellCheck="false"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={`${resultBoxOpen}`}
            aria-owns="apisearch-listbox"
            data-search="Apisearch-autocomplete"

            onInput={event => searchAction(event.target.value)}
            onKeyDown={keyDownAction}
            onBlur={focusOutAction}
        />
);