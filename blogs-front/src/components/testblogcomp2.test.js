import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'testtitle',
    author: 'testauthor',
    url: 'testurl',
    likes: 0
  }

  test('clicking the button twice generates 2 calls', () => {
    const mockHandler = jest.fn()
    const component = render(
      <Blog blog={blog} raiseLikes={mockHandler}/>
    )

    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)

  })
})