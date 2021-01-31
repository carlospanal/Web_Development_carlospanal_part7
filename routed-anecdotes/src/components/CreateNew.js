import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  useHistory,
} from 'react-router-dom'

const CreateNew = (props) => {
  const history = useHistory()

  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0,
    })
    history.push('/')
    props.setNotification(
      {
        content,
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
          <input name="content" value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name="info" value={info} onChange={(e) => setInfo(e.target.value)} />
        </div>
        <button type="submit">
          create
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
