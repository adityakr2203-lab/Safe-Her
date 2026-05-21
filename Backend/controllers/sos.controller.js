const Contact = require("../models/contact.model");

exports.sendSOS = async (req, res) => {

  try {

    const {
      userId,
      latitude,
      longitude,
    } = req.body;

    // find trusted contacts
    const contacts = await Contact.find({
      user: userId,
    });

    // google map link
    const locationLink =
      `https://www.google.com/maps?q=${latitude},${longitude}`;

    // preset message
    const message = `
🚨 EMERGENCY ALERT 🚨

I need help immediately.

📍 Live Location:
${locationLink}

Please contact me urgently.
`;

    // DEMO
    console.log("SOS MESSAGE:");
    console.log(message);

    console.log("Sending to contacts:");

    contacts.forEach((contact) => {
      console.log(contact.phone);
    });

    res.status(200).json({
      success: true,
      message: "SOS sent successfully",
      contacts,
      sosMessage: message,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};