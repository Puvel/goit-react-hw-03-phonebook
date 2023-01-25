import { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import css from './contactForm.module.css';

export class ContactForm extends Component {
  state = { name: '', number: '' };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  contactsVerification = () => {
    if (this.props.contacts.length) {
      return this.props.contacts.some(
        contact => contact.name === this.state.name
      );
    }
  };

  submitForm = e => {
    e.preventDefault();
    const { name, number } = this.state;
    if (this.contactsVerification()) {
      alert(`${name} is already in contacts`);
    } else {
      const newContact = { id: nanoid(), name, number };
      this.props.getContactInfo(newContact);
      this.setState({ name: '', number: '' });
    }
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={css.contactForm} onSubmit={this.submitForm}>
        <label className={css.contactFormLabel}>
          Name
          <input
            className={css.contactFormInput}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={this.handleChange}
          />
        </label>
        <label className={css.contactFormLabel}>
          Number
          <input
            className={css.contactFormInput}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={this.handleChange}
          />
        </label>
        <button className={css.contactFormBtn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  contacts: PropTypes.array,
  getContactInfo: PropTypes.func.isRequired,
};
