import React from 'react';
import PropTypes from 'prop-types';
import ContactsItem from './contactsItem/ContactsItem';
import style from './contactsList.module.css';

const ContactsList = ({ contacts, deleteContact }) => {
  if (contacts.length) {
    return (
      <ul className={style.contactsList}>
        {contacts.map(contact => (
          <ContactsItem
            key={contact.id}
            contact={contact}
            deleteContact={deleteContact}
          />
        ))}
      </ul>
    );
  }
  return <h3 className={style.placeholderTitle}>Contacts not found!</h3>;
};

ContactsList.defaultProps = {
  contacts: [],
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  deleteContact: PropTypes.func.isRequired,
};

export default ContactsList;
