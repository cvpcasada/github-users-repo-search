import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import SearchBox from '../components/SearchBox'
import { resetErrorMessage } from '../actions'

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleDismissClick = this.handleDismissClick.bind(this)
  }

  handleDismissClick(e) {
    this.props.resetErrorMessage();
    e.preventDefault()
  }

  handleChange(nextValue) {
    browserHistory.push(`/${nextValue}`)
  }

  renderErrorMessage() {
    const { errorMessage } = this.props;
    if (!errorMessage) {
      return null
    }

    return (
      <p className="img-rounded" style={{ backgroundColor: '#e99', padding: 10, margin: '1rem 0' }}>
        <b>{errorMessage}</b>
        {' '}
        (<a href="#"
            onClick={this.handleDismissClick}>
          Dismiss
        </a>)
      </p>
    )
  }

  render() {
    const { children, inputValue } = this.props;
    return (
      <div className="container">
        <SearchBox value={inputValue}
                 onChange={this.handleChange} />

        {this.renderErrorMessage()}

        {children}
      </div>
    )
  }
}

App.propTypes = {
  // Injected by React Redux
  errorMessage: PropTypes.string,
  resetErrorMessage: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  // Injected by React Router
  children: PropTypes.node
};

function mapStateToProps(state, ownProps) {
  return {
    errorMessage: state.errorMessage,
    inputValue: ownProps.location.pathname.substring(1)
  }
}

export default connect(mapStateToProps, {
  resetErrorMessage
})(App)
