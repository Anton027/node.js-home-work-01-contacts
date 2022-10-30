const fs = require("fs").promises;
const path = require('path');
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname,'./db/contacts.json');

async function listContacts() {
  const contacts = await fs.readFile(
    contactsPath,
    "utf-8"
  );
  return JSON.parse(contacts);
}


async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(
    item => item.id === contactId.toString());
  return contact;
  
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contact = await getContactById(contactId);

  if (!contact) {
    return null;
  }
  const deleteContact = contacts.filter(
    (item) => item.id !== contactId.toString());
  await fs.writeFile(
    contactsPath,
    JSON.stringify(deleteContact)
  );
  return contact;
}

async function addContact(name, email, phone) {
  // ...твій код
  const id = nanoid();
  const contact = {id, name, email, phone}
  const contacts = await listContacts();
  contacts.push(contact);
  await fs.writeFile(contactsPath,
    JSON.stringify(contacts))
  return contact;
}

module.exports = {
  listContacts,
  addContact,
  getContactById,
  removeContact
}