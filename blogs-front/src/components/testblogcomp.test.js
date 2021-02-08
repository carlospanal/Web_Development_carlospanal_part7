import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Togglable />', () => {
  const blog = {
    title: 'testtitle',
    author: 'testauthor',
    url: 'testurl',
    likes: 0
  }
  let component

  test('renders content', () => {
    component = render(
      <Blog blog={blog} />
    )
    expect(component.container).toHaveTextContent(
      'testtitle'
    )
    expect(component.container).toHaveTextContent(
      'testauthor'
    )

    const div = component.container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')

  })

  test('clicking the button shows hidden stuff', () => {

    const component = render(
      <Blog blog={blog}/>
    )

    const button = component.getByText('details')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: block')

  })


/*
  // method 2
  const element = component.getByText(
    'Component testing is done with react-testing-library'
  )
  expect(element).toBeDefined()

  // method 3
  const div = component.container.querySelector('.note')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )*/
})