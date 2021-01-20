const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');

//route: GET, api/contacts
//desc: get all users contact
//access: private
router.get('/', auth, async (req, res) => {
    try{
        //search in the users collection
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
        res.json(contacts);
    }
    catch(err){
        console.error(err.mesaage);
        res.status(500).send('server error');
    }
});

//route: POST, api/contacts
//desc: add new contact
//access: private
router.post('/', [ auth, [
    check('name', 'name is required')
    .not()
    .isEmpty()
]
],
async (req, res) => {
    const errors = validationResult(req);
    //if there are erros
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    //destructure
    const { name, email, phone, type } = req.body;

    try{
        const newContact = new Contact({
            name: name,
            email: email,
            phone: phone,
            type: type,
            user: req.user.id
        });

        //insert into collection
        const contact = await newContact.save();

        res.json(contact);
    }
    catch(err){
        console.error(err.mesaage);
        res.status(500).send('server error');
    }
});

//route: PUT, api/contacts
//desc: update contact
//access: private
router.put('/:id', auth, async (req, res) => {
    //destructure
    const { name, email, phone, type } = req.body;

    //build contact object
    const contactField= {};
    if(name) contactField.name = name;
    if(email) contactField.email = email;
    if(phone) contactField.phone = phone;
    if(type) contactField.type = type;

    try{
        let contact = await Contact.findById(req.params.id);

        if(!contact){
            return res.status(404).json({ msg: 'contact not found'});
        }

        //only the user that owns contact
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'not authorized' });
        }

        //update contact
        contact = await Contact.findByIdAndUpdate(req.params.id,
            //set the contactfields from above
            { $set: contactField },
            //if contact doesnt exist, create it
            { new: true });

            res.json(contact);
    }
    catch(err){
        console.error(err.mesaage);
        res.status(500).send('server error');
    }
});

//route: DELETE, api/contacts
//desc: delete contact
//access: private
router.delete('/:id', auth, async (req, res) => {
    try{
        let contact = await Contact.findById(req.params.id);

        if(!contact){
            return res.status(404).json({ msg: 'contact not found'});
        }

        //only the user that owns contact
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'not authorized' });
        }

        //delete contact
        await Contact.findByIdAndRemove(req.params.id);

        res.json({ msg: 'contact removed' });
    }
    catch(err){
        console.error(err.mesaage);
        res.status(500).send('server error');
    }
});

module.exports = router;