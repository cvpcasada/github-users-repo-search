import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadUser, loadUserRepos } from '../actions'
import User from '../components/User'
import Repo from '../components/Repo'
import List from '../components/List'
import zip from 'lodash/zip'

function loadData(props) {
  const { login } = props;
  props.loadUser(login, [ 'name' ]);
  props.loadUserRepos(login);
}

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.renderRepo = this.renderRepo.bind(this);
    this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this);
  }

  componentWillMount() {
    loadData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login !== this.props.login) {
      loadData(nextProps);
    }
  }

  handleLoadMoreClick() {
    this.props.loadUserRepos(this.props.login, true);
  }

  renderRepo([ repo, owner ]) {
    return (
      <Repo repo={repo}
            owner={owner}
            key={repo.fullName} />
    )
  }

  render() {
    const { user, login } = this.props;
    if (!user) {
      return <h1><i>Loading {login}’s profile...</i></h1>;
    }

    const { userReposArr, repoOwners, userPagination } = this.props;
    return (
      <div>
        <User user={user} />

        <List renderItem={this.renderRepo}
              items={zip(userReposArr, repoOwners)}
              onLoadMoreClick={this.handleLoadMoreClick}
              loadingLabel={`Loading ${login}’s repos...`}
              {...userPagination} />
      </div>
    )
  }
}

UserPage.propTypes = {
  login: PropTypes.string.isRequired,
  user: PropTypes.object,
  userPagination: PropTypes.object,
  loadUser: PropTypes.func.isRequired,
  loadUserRepos: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  // We need to lower case the login due to the way GitHub's API behaves.
  // Have a look at ../middleware/api.js for more details.
  const login = ownProps.params.login.toLowerCase();
  const {
    pagination: { userRepos },
    entities: { users, repos }
  } = state;

  const userPagination = userRepos[login] || { ids: [] };
  const userReposArr = userPagination.ids.map(id => repos[id]);
  const repoOwners = userReposArr.map(repo => users[repo.owner]);

  return {
    login,
    userReposArr,
    repoOwners,
    userPagination,
    user: users[login]
  }
}

export default connect(mapStateToProps, {
  loadUser,
  loadUserRepos
})(UserPage)
