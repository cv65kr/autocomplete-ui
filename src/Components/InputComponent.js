import {h} from "preact";
import {actions} from "../actions";
import { connect } from 'unistore/preact'

export const InputComponent = connect('', actions) (
    ({
         /** component props */
        htmlNodeInheritProps,

        /** actions */
        searchAction,
        keyDownAction,
        focusOutAction
    }) =>
        <input
            {...htmlNodeInheritProps}
            autocomplete="off"
            spellCheck="false"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded="false"
            aria-owns="apisearch-listbox"
            data-search="Apisearch-autocomplete"

            onInput={searchAction}
            onKeyDown={keyDownAction}
            onBlur={focusOutAction}
        />
);