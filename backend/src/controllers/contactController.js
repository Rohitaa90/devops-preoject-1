const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, '../data/contacts.json');

const readContacts = () => {
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify([]));
  }
  return JSON.parse(fs.readFileSync(dataFile, 'utf8'));
};

const writeContacts = (contacts) => {
  fs.writeFileSync(dataFile, JSON.stringify(contacts, null, 2));
};

exports.submitContact = (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields required' });
  }

  const contacts = readContacts();
  const newContact = {
    id: Date.now(),
    name,
    email,
    message,
    timestamp: new Date().toISOString()
  };

  contacts.push(newContact);
  writeContacts(contacts);

  res.status(201).json({ success: true, contact: newContact });
};

exports.getAllContacts = (req, res) => {
  const contacts = readContacts();
  res.json(contacts);
};
