import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../../store/all-users'
import {Link} from 'react-router-dom'
import Header from '../sidebar/header'

export class AdminUsers extends Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    const users = this.props.users || []
    return (
      <div>
        <Header />
        {users.length ? (
          <div>
            {users.map(user => (
              <div key={user.id}>
                <Link to={`/users/${user.id}`}>{user.user_email}</Link>
              </div>
            ))}
          </div>
        ) : (
          <h3 className="loading">Loading...</h3>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  users: state.users
})

const mapDispatch = dispatch => {
  return {
    getUsers: () => dispatch(fetchUsers())
  }
}

export default connect(mapState, mapDispatch)(AdminUsers)
