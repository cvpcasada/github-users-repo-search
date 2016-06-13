import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class User extends Component {
  render() {
    const { login, avatarUrl, name, email, htmlUrl } = this.props.user;

    return (
        <div className="media" style={{margin:'1rem'}}>
            <div className="media-left">
              <img className="img-circle" src={avatarUrl} width="80" height="80" />
            </div>
            <div className="media-body">
              <div style={{'fontSize':'2.5rem', 'fontWeight':'bold'}}>
                <a href={htmlUrl} target="_blank">
                  {login}
                </a>
              </div>
              <div style={{'fontSize':'1.6rem'}}>{name && <span>{name}</span>}</div>
              <div>{email}</div>


            </div>



        </div>
    )
  }
}

User.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    name: PropTypes.string
  }).isRequired
};
