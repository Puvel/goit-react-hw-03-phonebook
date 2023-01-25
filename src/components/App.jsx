import { Component } from 'react';
import { Section } from 'components/section/Section';
import { ContactForm } from 'components/contactForm/ContactForm';
import { ContactsList } from 'components/contactsList/ContactsList';
import { Filter } from 'components/filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const loadContacts = localStorage.getItem('contacts');
    if (loadContacts) {
      this.setState({ contacts: JSON.parse(loadContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
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
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  deleteContact = e => {
    const id = e.target.id;
    this.setState(prevState => ({
      contacts: [...prevState.contacts.filter(contact => contact.id !== id)],
    }));
  };

  render() {
    const { filter, contacts } = this.state;
    return (
      <>
        <Section title="Phonebook">
          <ContactForm
            getContactInfo={this.getContactInfo}
            contacts={this.state.contacts}
          />
        </Section>
        <Section title="Contacts">
          {!!contacts.length && (
            <Filter filter={filter} filterInput={this.filterInput} />
          )}
          <ContactsList
            contacts={this.contactsFilter()}
            deleteContact={this.deleteContact}
          />
        </Section>
      </>
    );
  }
}
