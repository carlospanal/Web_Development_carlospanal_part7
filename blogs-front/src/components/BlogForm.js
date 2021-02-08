import React, { useState } from 'react'
import {
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Collapse,
} from '@material-ui/core'

const BlogForm = ({ createBlog }) => {


  const [ title, setTitle] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')
  const [checked, setChecked] = React.useState(false)

  const handleChange = () => {
    setChecked((prev) => !prev)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
    handleChange()
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  return (
    <div className="formDiv">
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label="New blog"
      />
      <Collapse in={checked}>
        <form onSubmit={addBlog}>
          <TextField id="standard-search" label="Title" type="search"
            value={title}
            onChange={handleTitleChange}
          />
          <TextField id="standard-search" label="Author" type="search"
            value={author}
            onChange={handleAuthorChange}
          />
          <TextField id="standard-search" label="URL" type="search"
            value={url}
            onChange={handleUrlChange}
          />
          <Button variant="contained" type="submit">submit new blog</Button>
        </form>
      </Collapse>
    </div>
  )
}

export default BlogForm

