const Contact = require("../model/ContactSchema");
const nodemailer = require("nodemailer");


// CREATE MESSAGE
const createContact = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        if (!name || !email || !phone || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const contact = await Contact.create({ name, email, message, phone });


        const transporter = nodemailer.createTransport({
            host: "smtp.hostinger.com",
            port: 465,
            secure: true,
            auth: {
                user: "hello@yashasviprasad.com",
                pass: "Yash@321#",
            },
            tls: {
                rejectUnauthorized: false,
            },
        });


        await transporter.sendMail({
            from: `"Contact Form" <hello@yashasviprasad.com>`,
            to: "hello@yashasviprasad.com",
            replyTo: email,
            subject: `New Contact from ${name}`,
            html: `
                <h3>New Message</h3>
                <p><b>Name:</b> ${name}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Message:</b> ${message}</p>
                  <p><b>Phone:</b> ${phone}</p>
            `,
        });

        res.status(201).json({
            success: true,
            message: "Message sent successfully",
            data: contact,
        });

    } catch (error) {
        console.log(" EMAIL ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



// GET ALL CONTACT MESSAGES
const getContacts = async (req, res) => {
    try {

        const contacts = await Contact.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            contacts,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = { createContact, getContacts };