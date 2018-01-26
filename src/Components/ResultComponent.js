import {h} from "preact";
import {actions} from "../actions";
import { connect } from 'unistore/preact'

/**
 * Suggested Search Component
 */
export const ResultComponent = connect('data')(
    ({data}) => (
        <div>
            Data: {JSON.stringify(data)}
        </div>
    )
);