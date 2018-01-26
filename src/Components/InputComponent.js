import {h} from "preact";
import {actions} from "../actions";
import { connect } from 'unistore/preact'

export const InputComponent = connect('data', actions) (
    ({ data, searchAction }) => (
        <input
            data-search={"Apisearch-autocomplete"}
            onInput={event => searchAction(event.target.value)}
        />
    )
);