/* eslint-disable react/no-array-index-key */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../../store/all-users'
import {Link} from 'react-router-dom'
import Header from '../sidebar/header'

const headers = [
  'Id',
  'Name',
  'Email',
  'Billing Address',
  'Shipping Address',
  'Phone Number',
  'User Type',
  ''
]

export class AdminUsers extends Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    const users = this.props.users || []
    return (
      <div>
        <Header />
        <div id="admin_table_border">
          {users.length ? (
            <table className="admin_table">
              <tbody>
                <tr>
                  {headers.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.user_full_name}</td>
                    <td>{user.user_email}</td>
                    <td>{user.user_billing_address}</td>
                    <td>{user.user_shipping_address}</td>
                    <td>{user.user_phone}</td>
                    <td>{user.user_type}</td>
                    <td>
                      <Link to={`/users/${user.id}`}>Edit</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h3 />
          )}
        </div>
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
