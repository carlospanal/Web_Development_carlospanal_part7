//import React, { useState, useEffect } from 'react'
import React from 'react'
import { connect } from 'react-redux'
import ufunctions from '../utils/ufunctions'
import {
  Link,
} from 'react-router-dom'

//import userService from '../services/users'
const Users = (props) => {

  const { blogs } = props

  const listedUsers = ufunctions.usersList(blogs)

  return (
    <table style= {{ width: '100%' }} >
      <tbody>
        <tr key='headersKey'>
          <th>Users</th>
          <th>Blogs uploaded</th>
        </tr>
        {listedUsers.map(user => (
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            <td>{user.blogs}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )


}

const mapStateToProps = (state) => ({
  blogs: state.blogs,
})

const mapDispatchToProps = {
}

const ConnectedUsers = connect(mapStateToProps, mapDispatchToProps)(Users)
export default ConnectedUsers
// {users.map(user => <tr key={user.id}><td>{user.name}<td></td>1</td></tr>)}