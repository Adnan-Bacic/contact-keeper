import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/ContactContext';

//prop
const ContactItem = ({ contact }) => {
    //initializing context
    const contactContext = useContext(ContactContext);
    const { deleteContact, setCurrent, clearCurrent } = contactContext;

    //destructure
    const { _id, name, email, phone, type } = contact;

    const onDelete = () => {
        deleteContact(_id);
        clearCurrent();
    }

    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">
                {name}
                <span style={{ float: "right" }} className={"badge " + (type === 'professional' ? "badge-success" : "badge-primary")}>
                    {/* make first letter capital */}
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
            </h3>
            <ul className="list">
                {/* if statements */}
                {email && (
                <li>
                    <i className="fas fa-envelope"></i> {email}
                </li>)}
                {phone && (
                <li>
                    <i className="fas fa-phone"></i> {phone}
                </li>)}
            </ul>
            <p>
                <button className="btn btn-dark btn-sm" onClick={() => setCurrent(contact)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
            </p>
        </div>
    )
}

ContactItem.protoTypes = {
    contact: PropTypes.object.isRequired
}

export default ContactItem