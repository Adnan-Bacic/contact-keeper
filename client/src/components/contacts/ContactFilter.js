import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/ContactContext';

const ContactFilter = () => {

    const contactContext = useContext(ContactContext);
    const text = useRef('');

    //destructure
    const { filterContacts, clearFilter, filtered } = contactContext;

    useEffect(() => {
        if(filtered === null){
            text.current.value = '';
        }
    });

    const onFilterChange = (e) => {
        if(text.current.value !== ''){
            filterContacts(e.target.value);
        } else {
            clearFilter();
        }
    }

    return (
        <form>
            <label htmlFor="filter">Filter contact</label>
            <input ref={text} type="text" onChange={onFilterChange} name="filter"></input>
        </form>
    )
}

export default ContactFilter