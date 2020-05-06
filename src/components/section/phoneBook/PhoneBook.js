import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import style from './phoneBook.module.css';

class PhoneBook extends Component {
  state = { name: '', number: '' };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  contactsVerification = () => {
    return this.props.contacts.some(
      contact => contact.name === this.state.name,
    );
  };

  submitForm = e => {
    e.preventDefault();
    const { name, number } = this.state;
    if (this.contactsVerification()) {
      // eslint-disable-next-line no-alert
      alert('!!!');
    } else {
      const newContact = { id: uuidv4(), name, number };
      this.props.getContactInfo(newContact);
      this.setState({ name: '', number: '' });
    }
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={style.contactForm} onSubmit={this.submitForm}>
        <label className={style.contactFormLabel}>
          Name
          <input
            className={style.contactFormInput}
            type="text"
            placeholder="Name..."
            value={name}
            name="name"
            onChange={this.handleChange}
            required
          />
        </label>
        <label className={style.contactFormLabel}>
          Number
          <input
            className={style.contactFormInput}
            placeholder="38(___)___-__-__"
            type="tel"
            value={number}
            name="number"
            onChange={this.handleChange}
            required
          />
        </label>
        <button className={style.contactFormBtn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

PhoneBook.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  getContactInfo: PropTypes.func.isRequired,
};

export default PhoneBook;
