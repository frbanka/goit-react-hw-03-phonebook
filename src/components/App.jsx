import React, { Component } from 'react';
import AddContact from './AddContact/AddContact';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';

class App extends Component {
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
  inputContact = newContact => {
    const checkIfExists = this.state.contacts.some(
      contact =>
        contact.name.toLowerCase().trim() ===
        newContact.name.toLowerCase().trim()
    );
    if (checkIfExists) {
      alert(`${newContact.name} is already in contacts!`);
    } else {
      this.setState(({ contacts }) => ({
        contacts: [...contacts, newContact],
      }));
    }
  };
  componentDidUpdate() {
    localStorage.setItem('newState', JSON.stringify(this.state.contacts));
    console.log(localStorage);
  }
  componentDidMount() {
    const newStateStorage = localStorage.getItem('newState');
    const newState = JSON.parse(newStateStorage);
    if (newState !== null) {
      this.setState({ ...this.state, contacts: newState });
    }
  }
  getContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  filterChange = filter => this.setState({ filter });

  removeContact = id =>
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));
  render() {
    const { filter } = this.state;
    const allContacts = this.getContacts();
    return (
      <section>
        <h1>Phonebook</h1>
        <AddContact whenAdd={this.inputContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} onChange={this.filterChange} />
        <Contacts contacts={allContacts} contactRemove={this.removeContact} />
      </section>
    );
  }
}
export default App;
