const argv = require("yargs").argv;
const fn = require("./contacts");

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            const contacts = await fn.listContacts();
            console.table(contacts);
            return contacts;

        case "get":
            const getContactId = await fn.getContactById(id);
            console.table(getContactId);
            return getContactId;

        case "add":
            await fn.addContact(
                name,
                email,
                phone
            );
            break;

        case "remove":
            const removeContact =
            await fn.removeContact(id);
            console.table(removeContact);
            return removeContact;

            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(argv);