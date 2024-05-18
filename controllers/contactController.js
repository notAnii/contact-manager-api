const asyncHandler = require('express-async-handler');

//@desc Get all contacts
//@route GET /api/contacts
//@access Public
const getContacts = asyncHandler(async (req, res) => {
    res.status(200).json({message: "Get all contacts"});
});

//@desc Get a contact
//@route GET /api/contacts/:id
//@access Public
const getContact = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Get a contact for ${req.params.id}`});
});

//@desc Create a contact
//@route POST /api/contacts
//@access Public
const createContact = asyncHandler(async (req, res) => {
    console.log(req.body);
    const {name, email, phone} = req.body;

    if(!name || !email || !phone) {
        res.status(400);
        throw new Error("Please enter all fields");
    }
    res.status(201).json({message: "Create a new contact"});
});

//@desc Update a contact
//@route POST /api/contacts/:id
//@access Public
const updateContact = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Update a contact for ${req.params.id}`});
});

//@desc Delete a contact
//@route POST /api/contacts/:id
//@access Public
const deleteContact = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Delete a contact for ${req.params.id}`});
});

module.exports = { 
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
};