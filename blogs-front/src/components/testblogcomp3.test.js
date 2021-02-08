import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const input1 = component.container.querySelector('.titleinput')
  const input2 = component.container.querySelector('.authorinput')
  const input3 = component.container.querySelector('.urlinput')
  const form = component.container.querySelector('form')

  fireEvent.change(input1, {
    target: { value: 'testtitle' }
  })
  fireEvent.change(input2, {
    target: { value: 'testauthor' }
  })
  fireEvent.change(input3, {
    target: { value: 'testurl' }
  })
  /*
  <input
  id='author'
  value={author}
  onChange={() => {}}
/>*/
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  //const author = component.container.querySelector('#author')
  //const title = component.container.querySelector('#title')
  //const author = component.container.querySelector('#author')
  expect(createBlog.mock.calls[0][0].title).toBe('testtitle' )
  expect(createBlog.mock.calls[0][0].author).toBe('testauthor' )
  expect(createBlog.mock.calls[0][0].url).toBe('testurl' )
  //console.log(author)
  // const url = component.container.querySelector('#url')
  //expect(title).toBe('testtitle' )
  // expect(author).toBe('testauthor' )

  //expect(url).toBe('testurl' )
})