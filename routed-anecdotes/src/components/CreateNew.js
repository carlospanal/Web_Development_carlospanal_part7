/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import PropTypes from 'prop-types'
import {
  useHistory,
} from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = (props) => {
  const history = useHistory()

  const content = useField('content')
  const author = useField('author')
  const info = useField('info')

  const handleReset = () => {
    content.onReset()
    author.onReset()
    info.onReset()
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    props.addNew({
      content: content.fieldObject.value,
      author: author.fieldObject.value,
      info: info.fieldObject.value,
      votes: 0,
    })
    history.push('/')
    props.setNotification(
      {
        content: content.fieldObject.value,
        style: { display: 'block' },
      },
    )

    setTimeout(() => {
      props.setNotification(
        {
          content: '',
          style: { display: 'none' },
        },
      )
    }, 10000)
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...(content.fieldObject)} />
        </div>
        <div>
          author
          <input {...(author.fieldObject)} />
        </div>
        <div>
          url for more info
          <input {...(info.fieldObject)} />
        </div>
        <button type="submit">
          create
        </button>
        <button type="button" onClick={handleReset}>
          reset data
        </button>
      </form>
    </div>
  )
}

CreateNew.propTypes = {
  addNew: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
}
export default CreateNew
