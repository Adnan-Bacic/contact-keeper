import React, { useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types';

const AlertState = props => {
    const initialState = [];

    //state allows us to acces the state
    //dispatch lets us dispatch objects to the reducer
    const [state, dispatch] = useReducer(alertReducer, initialState);

    //set alert
    const setAlert = (msg, type, timeout = 5000) => {
        const id = uuid();
        dispatch({
            type: SET_ALERT,
            payload: { msg, type, id }
        });
        setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout)
    }

    //state
    return (
        <AlertContext.Provider
            value={{
                alerts: state,
                setAlert
            }}>
            { props.children }
        </AlertContext.Provider>
    )
}

export default AlertState