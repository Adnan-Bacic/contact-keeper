import React, { useReducer } from 'react';
import axios from 'axios';
//import {v4 as uuidv4 } from 'uuid';
import ContactContext from './ContactContext';
import contactReducer from './ContactReducer';
import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR
} from '../types';

const ContactState = props => {
    const initialState = {
        //array with contacts
        contacts: null,

        current: null,
        filtered: null,
        error: null
    };

    //state allows us to acces the state
    //dispatch lets us dispatch objects to the reducer
    const [state, dispatch] = useReducer(contactReducer, initialState);

    //get contacts
    const getContacts = async () => {
        try {
            const res = await axios.get('/api/contacts');

            dispatch({
                type: GET_CONTACTS,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.msg
            });
        }
    }

    //add contact
    const addContact = async contact => {
        //contact.id = uuidv4();

        const config = {
            headers:{
                'Content-Type': 'Application/json'
            }
        }

        try {
            const res = await axios.post('/api/contacts', contact, config);

            dispatch({
                type: ADD_CONTACT,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.msg
            });
        }
    }

    //delete contact
    const deleteContact = async (id) => {
        try {
            await axios.delete(`/api/contacts/${id}`);

            dispatch({
                type: CONTACT_ERROR,
                payload: id
            });
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.msg
            });
        }

        dispatch({
            type: DELETE_CONTACT,
            payload: id
        });
    }

    //update contact
    const updateContact = async (contact) => {
        const config = {
            headers:{
                'Content-Type': 'Application/json'
            }
        }

        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);

            dispatch({
                type: UPDATE_CONTACT,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.msg
            });
        }
    }

    //clear contacts
    const clearContacts = () => {
        dispatch({
            type: CLEAR_CONTACTS
        });
    }

    //set current contact
    const setCurrent = contact => {
        dispatch({
            type: SET_CURRENT,
            payload: contact
        });
    }

    //clear current contact
    const clearCurrent = () => {
        dispatch({
            type: CLEAR_CURRENT
        });
    }

    //filter contacts
    const filterContacts = text => {
        dispatch({
            type: FILTER_CONTACTS,
            payload: text
        });
    }

    //clear filter
    const clearFilter = () => {
        dispatch({
            type: CLEAR_FILTER
        });
    }

    //state contacts
    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                clearFilter,
                getContacts,
                clearContacts
            }}>
            { props.children }
        </ContactContext.Provider>
    )
}

export default ContactState