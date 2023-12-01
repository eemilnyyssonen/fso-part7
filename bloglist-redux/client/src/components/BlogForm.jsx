import { Button, TextField } from '@mui/material'
import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  const addBlog = async (event) => {
    event.preventDefault()
    await createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    })
    setNewBlog({
      title: '',
      author: '',
      url: '',
    })
  }

  return (
    <form onSubmit={addBlog}>
      <div style={{ marginBottom: '10px' }}>
        <TextField
          size="small"
          label="title"
          value={newBlog.title}
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, title: target.value })
          }
          id="title-input"
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <TextField
          size="small"
          label="author"
          value={newBlog.author}
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, author: target.value })
          }
          id="author-input"
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <TextField
          size="small"
          label="url"
          value={newBlog.url}
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, url: target.value })
          }
          id="url-input"
        />
      </div>
      <Button
        size="small"
        variant="contained"
        color="primary"
        id="submit-button"
        type="submit"
      >
        create
      </Button>
    </form>
  )
}
export default BlogForm
