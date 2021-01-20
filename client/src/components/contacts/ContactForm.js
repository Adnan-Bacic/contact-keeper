import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/ContactContext';

const ContactForm = () => {

    const contactContext = useContext(ContactContext);

    //destructure
    const { addContact, updateContact, clearCurrent, current } = contactContext;

    //same as componentdidmount
    useEffect(() => {
        if(current !== null){
            setContact(current);
        } else {
            //set back default values
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            });
        }
    }, [contactContext, current]);

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    //destructure
    const { name, email, phone, type } = contact;

    //get the input for every input
    const inputOnChange = (e) => setContact({...contact, [e.target.name]: e.target.value });

    //form submission
    const formOnSubmit = (e) => {
        e.preventDefault();

        if(current === null){
            //run the addCOntect function
            addContact(contact);
        } else {
            updateContact(contact);
        }
        clearAll();
        /*
        //set back default values
        setContact({
            name: '',
            email: '',
            phone: '',
            type: 'personal'
        })
        */
    }

    const clearAll = () => {
        clearCurrent();
    };

    return (
        <form onSubmit={formOnSubmit}>
            <h2 className="text-primary">{current ? 'Edit contact' : 'Add contact'}</h2>
            <label htmlFor="name">Name</label>
            <input onChange={inputOnChange} value={name} type="text" name="name"></input>

            <label htmlFor="email">Email</label>
            <input onChange={inputOnChange} value={email} type="text" name="email"></input>

            <label htmlFor="phone">Phone</label>
            <input onChange={inputOnChange} value={phone} type="text" name="phone"></input>

            <label htmlFor="personal">Type personal</label>
            <input onChange={inputOnChange} type="radio" name="type" value="personal" checked={type === 'personal'}></input>
            <br></br>
            <label htmlFor="professional">Type professional</label>
            <input onChange={inputOnChange} type="radio" name="type" value="professional" checked={type === 'professional'}></input>
            <button type="submit" className="btn btn-primary btn-block">{current ? 'Update contact' : 'Add contact'}</button>
            <div>
                {current && <div>
                    <button className="btn btn-light btn-block" onClick={clearAll}>Clear</button>
                    </div>}
            </div>
        </form>
    )
}

export default ContactForm