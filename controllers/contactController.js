const asyncHandler = require('express-async-handler');
const Contact = require('../models/Contact');
const CustomError = require('../utils/CustomError');

//@desc Get all contacts
//@route GET /api/contacts
//@access Public
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

//@desc Get a contact
//@route GET /api/contacts/:id
//@access Public
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        throw new CustomError(`Contact not found with id of ${req.params.id}`, 404);
    }
    res.status(200).json(contact);
});

//@desc Create a contact
//@route POST /api/contacts
//@access Public
const createContact = asyncHandler(async (req, res) => {
    console.log(req.body);
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        throw new CustomError ("Name, email, and phone are required", 400);
    }
    const contact = await Contact.create({name, email, phone});
    res.status(201).json(contact);
});

//@desc Update a contact
//@route POST /api/contacts/:id
//@access Public
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        throw new CustomError(`Contact not found with id of ${req.params.id}`, 404);
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedContact);
});

//@desc Delete a contact
//@route POST /api/contacts/:id
//@access Public
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact){
        throw new CustomError(`Contact not found with id of ${req.params.id}`, 404);
    }
    res.status(200).json(contact);
});

module.exports = { 
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
};