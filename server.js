const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port =  5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
const uri = 'mongodb+srv://praveenkumarpandeyup:praveen@cluster0.hhxiq6i.mongodb.net/message?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define a schema and model for contact messages
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// POST route to handle form submission
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });

    try {
        await newContact.save();
        res.status(201).send('Message saved');
    } catch (error) {
        res.status(400).send('Error saving message');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
