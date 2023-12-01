import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'This should be rendered',
    url: 'www.url.url',
    author: 'Render Me',
    likes: 0,
    user: {
      username: 'admin',
    },
  }
  const user = {
    username: 'admin',
    token: '',
  }

  let container
  let mockHandler

  beforeEach(() => {
    mockHandler = jest.fn()
    container = render(
      <Blog blog={blog} user={user} updateBlog={mockHandler} />,
    ).container
  })
  /*
  5.13.
  Make a test, which checks that the component displaying a blog renders the blog's title and author,
  but does not render its URL or number of likes by default.

  Add CSS classes to the component to help the testing as necessary.
  */
  test('renders only default content', () => {
    //const title = await screen.findAllByText('This should be rendered')
    //const author = await screen.findAllByText('Render Me')

    const defaultContent = container.querySelector('.defaultContent')
    expect(defaultContent).toHaveTextContent(blog.title)
    expect(defaultContent).toHaveTextContent(blog.author)

    const showableContent = container.querySelector('.showableContent')
    expect(showableContent).toHaveStyle('display: none')
  })
  /*
  5.14: Blog list tests, step2

  Make a test, which checks that the blog's URL and number of likes are shown when the button controlling
  the shown details has been clicked.
  */
  test('url and likes show when user clicks the show button', async () => {
    await userEvent.click(screen.getByText('view'))
    const showableContent = container.querySelector('.showableContent')
    expect(showableContent).not.toHaveStyle('display: none')
    expect(showableContent).toHaveTextContent(blog.url)
    expect(showableContent).toHaveTextContent(`likes ${blog.likes}`)
  })
  /*
  5.15: Blog list tests, step3

  Make a test, which ensures that if the like button is clicked twice,
  the event handler the component received as props is called twice.
  */
  test('event handler called twice when likebutton clicked twice', async () => {
    await userEvent.dblClick(screen.getByText('like'))
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
