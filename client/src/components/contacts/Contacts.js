import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';
import ContactContext from '../../context/contact/ContactContext';

const Contacts = () => {
    //initialize context
    const contactContext = useContext(ContactContext);

    //destructure
    const { contacts, filtered, getContacts, loading } = contactContext;

    useEffect(()=> {
        getContacts();
        //es-lint-disable-next-line
    }, []);

    if(contacts !== null && contacts.length === 0 && !loading){
        return <h4>Please add a contact</h4>;
    }

    return (
        <Fragment>
            {contacts !== null && !loading ? (
                <TransitionGroup>
                {/* if there is something, loop through. else show contacts */}
                {/* we must move key from contactitem to csstrasnition */}
               {filtered !== null ? filtered.map(contact => (
               <CSSTransition key={contact._id} timeout={500} classNames="item">
                   <ContactItem contact={contact}></ContactItem>
               </CSSTransition>
              )) : contacts.map(contact => (
               <CSSTransition key={contact._id} timeout={500} classNames="item">
                   <ContactItem contact={contact}></ContactItem>
               </CSSTransition>
              ))}
               </TransitionGroup>
            ) : <Spinner></Spinner>}
            
        </Fragment>
    )
}

export default Contacts