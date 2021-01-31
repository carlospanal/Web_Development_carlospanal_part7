import React from 'react'

const Menu = () => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <div>
      <a href="a" style={padding}>anecdotes</a>
      <a href="b" style={padding}>create new</a>
      <a href="c" style={padding}>about</a>
    </div>
  )
}

export default Menu
