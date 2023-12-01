import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> calls eventhandler with the right user input', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()
  const mockInput = {
    title: 'Test title',
    author: 'admin',
    url: 'url',
  }

  const { container } = render(<BlogForm createBlog={createBlog} />)

  const titleInput = container.querySelector('#title-input')
  const authorInput = container.querySelector('#author-input')
  const urlInput = container.querySelector('#url-input')
  const submitButton = screen.getByText('create')

  await user.type(titleInput, mockInput.title)
  await user.type(authorInput, mockInput.author)
  await user.type(urlInput, mockInput.url)

  await user.click(submitButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual(mockInput)
})

/*
5.16: Blog list tests, step4

Make a test for the new blog form. The test should check, that the
form calls the event handler it received as props with the right details when a new blog is created.
*/
