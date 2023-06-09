// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] !== undefined) {
    return this.contacts[id];
  }
  return false;
};

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, emailAddressBook, address) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.emailAddresses = emailAddressBook;
  this.address = address;
}

function EmailAddressBook() {
  this.emailAddresses = {};
  this.currentId = 0;
}

EmailAddressBook.prototype.addEmailAddress = function(emailAddress) {
  emailAddress.id = this.assignId();
  this.emailAddresses[emailAddress.id] = emailAddress;
};

EmailAddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

function EmailAddress(emailAddress, type) {
  this.emailAddress = emailAddress;
  this.type = type
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

// User Interface Logic ---------
let addressBook = new AddressBook();

function listContacts(addressBookToDisplay) {
  let contactsDiv = document.querySelector("div#contacts");
  contactsDiv.innerText = null;
  const ul = document.createElement("ul");
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    const li = document.createElement("li");
    li.append(contact.fullName());
    li.setAttribute("id", contact.id);
    ul.append(li);
  });
  contactsDiv.append(ul);
}

function displayContactDetails(event) {
  const contact = addressBook.findContact(event.target.id);
  document.querySelector("#first-name").innerText = contact.firstName;
  document.querySelector("#last-name").innerText = contact.lastName;
  document.querySelector("#phone-number").innerText = contact.phoneNumber;
  document.querySelector("#email-address").innerText = contact.emailAddresses.emailAddresses;
  document.querySelector("#address").innerText = contact.address;
  document.querySelector("button.delete").setAttribute("id", contact.id);
  document.querySelector("div#contact-details").removeAttribute("class");
}

function handleDelete(event) {
  addressBook.deleteContact(event.target.id);
  document.querySelector("button.delete").removeAttribute("id");
  document.querySelector("div#contact-details").setAttribute("class", "hidden");
  listContacts(addressBook);
}

function handleFormSubmission(event) {
  event.preventDefault();
  let emailAddressBook = new EmailAddressBook();
  const inputtedFirstName = document.querySelector("input#new-first-name").value;
  const inputtedLastName = document.querySelector("input#new-last-name").value;
  const inputtedPhoneNumber = document.querySelector("input#new-phone-number").value;
  const inputtedEmailAddress1 = document.querySelector("input#new-email-address").value;
  const inputtedEmailAddress2 = document.querySelector("input#new-email-address-two").value;
  const inputtedEmailAddress3 = document.querySelector("input#new-email-address-three").value;
  const inputtedEmailAddressType1 = document.querySelector("input#new-email-address-type").value;
  const inputtedEmailAddressType2 = document.querySelector("input#new-email-address-type-two").value;
  const inputtedEmailAddressType3 = document.querySelector("input#new-email-address-type-three").value;
  const inputtedAddress = document.querySelector("input#new-address").value;
  const newEmailAddress1 = new EmailAddress(inputtedEmailAddress1, inputtedEmailAddressType1);
  emailAddressBook.addEmailAddress(newEmailAddress1);
  if (inputtedEmailAddress2 != '') {
    const newEmailAddress2 = new EmailAddress(inputtedEmailAddress2, inputtedEmailAddressType2);
    emailAddressBook.addEmailAddress(newEmailAddress2);
  }
  if (inputtedEmailAddress3 != '') {
    const newEmailAddress3 = new EmailAddress(inputtedEmailAddress3, inputtedEmailAddressType3);
    emailAddressBook.addEmailAddress(newEmailAddress3);
  }
  const newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, emailAddressBook, inputtedAddress);
  addressBook.addContact(newContact);
  listContacts(addressBook);
  document.querySelector("input#new-first-name").value = null;
  document.querySelector("input#new-last-name").value = null;
  document.querySelector("input#new-phone-number").value = null;
}

window.addEventListener("load", function () {
  this.document.querySelector("form#new-contact").addEventListener("submit", handleFormSubmission);
  this.document.querySelector("div#contacts").addEventListener("click", displayContactDetails);
  this.document.querySelector("button.delete").addEventListener("click", handleDelete);
});