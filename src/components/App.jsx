import React, { Component } from 'react';
import { AddContact } from './AddContact/AddContact';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      contacts: [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ],
      filter: '',
      name: '',
      number: '',
    };
  }
  getContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  inputContact = newContact => {
    this.setState(({ contacts }) => ({
      contacts: [...contacts, newContact],
    }));
  };

  filterChange = filter => this.setState({ filter });

  checkContact = name => {
    const { contacts } = this.state;
    if (contacts.map(e => e.name.toLowerCase()).includes(name.toLowerCase())) {
      return alert(`${name} is already in contacts`);
    }
  };

  removeContact = id =>
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));

  render() {
    const { filter } = this.state;
    const allContacts = this.getContacts();
    return (
      <div>
        <h1>Phonebook</h1>
        <AddContact whenAdd={this.inputContact} nameValue={this.checkContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} onChange={this.filterChange} />
        <Contacts contacts={allContacts} contactRemove={this.removeContact} />
      </div>
    );
  }
}