import React, { Component } from 'react';
import '../style.css';
import Section from './section/Section';
import PhoneBook from './section/phoneBook/PhoneBook';
import ContactsList from './section/contactsList/ContactsList';
import FilterInput from './section/filterInput/FilterInput';
import storage from './ui/storage';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Gert Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const loadContacts = storage.load('contacts');
    if (loadContacts) {
      this.setState({ contacts: loadContacts });
    }
  }

  componentDidUpdate() {
    const { contacts } = this.state;
    storage.save('contacts', contacts);
  }

  getContactInfo = newContact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  filterInput = e => {
    this.setState({ filter: e.target.value });
  };

  contactsFilter = () => {
    if (this.state.contacts.length > 2) {
      return this.state.contacts.filter(contact =>
        contact.name.toLowerCase().includes(this.state.filter.toLowerCase()),
      );
    }
    return this.state.contacts;
  };

  deleteContact = e => {
    const { id } = e.target;
    this.setState(prevState => ({
      contacts: [...prevState.contacts.filter(contact => contact.id !== id)],
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    return (
      <>
        <Section title="Phonebook">
          <PhoneBook getContactInfo={this.getContactInfo} contacts={contacts} />
        </Section>
        <Section title="Contacts">
          <FilterInput filter={filter} filterInput={this.filterInput} />
          <ContactsList
            contacts={this.contactsFilter()}
            deleteContact={this.deleteContact}
          />
        </Section>
      </>
    );
  }
}

export default App;
