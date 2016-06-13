import React, { Component, PropTypes } from 'react'

import styles from '../../css/app.scss';

export default class Repo extends Component {

  render() {
    const { repo } = this.props;
    const { name, description, htmlUrl, language } = repo;

    return (
      <div className={`thumbnail ${styles.thumbnail}`}>
        <div className={`caption ${styles.caption}`}>
          <h3><a href={htmlUrl} target="_blank">{name}</a></h3>
          <p>{description}</p>
          <p>{language && <b>Language</b>} {language}</p>
        </div>
      </div>
    )
  }
}

Repo.propTypes = {
  repo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string
  }).isRequired,
  owner: PropTypes.shape({
    login: PropTypes.string.isRequired
  }).isRequired
};
