import {h} from "preact";
import {actions} from "../actions";
import { connect } from 'unistore/preact'

/**
 * Input Component
 *
 * @param htmlNodeInheritProps
 * @param searchAction
 * @param keyDownAction
 * @param focusOutAction
 * @constructor
 */
export const InputComponent = ({
   /** component props */
   htmlNodeInheritProps,

   /** actions */
   searchAction,
   keyDownAction,
   focusOutAction
}) => <input
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
/>;

/**
 * Input connector
 */
const ConnectedInput = connect('', actions)(InputComponent);

export default ConnectedInput;