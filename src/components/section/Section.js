import React from 'react';
import PropTypes from 'prop-types';
import style from './section.module.css';

const Section = ({ title, children }) => (
  <section className={style.section}>
    <h2 className={style.sectionTitle}>{title}</h2>
    {children}
  </section>
);
Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
export default Section;
