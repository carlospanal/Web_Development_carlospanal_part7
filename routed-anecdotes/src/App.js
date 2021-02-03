/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link,
} from 'react-router-dom'
import PropTypes from 'prop-types'
import Footer from './components/Footer'
import About from './components/About'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'
import CreateNew from './components/CreateNew'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    },
  ])

  // eslint-disable-next-line no-unused-vars
  const [notification, setNotification] = useState({
    content: '',
    style: { display: 'none' },
  })

  const addNew = (anecdote) => {
    const newAnecdote = {
      ...anecdote,
    }

    newAnecdote.id = (Math.random() * 10000)
    setAnecdotes(anecdotes.concat(newAnecdote))
  }

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id)

  // eslint-disable-next-line no-unused-vars
  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
  }

  const padding = {
    padding: 5,
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Router>
        <div>
          <Link style={padding} to="/">home</Link>
          <Link style={padding} to="/create">new user</Link>
          <Link style={padding} to="/about">about</Link>
        </div>
        <p style={notification.style}>
          New anecdote added:
          { notification.content }
        </p>
        <Switch>
          <Route path="/anecdotes/:id">
            <Anecdote anecdotes={anecdotes} />
          </Route>
          <Route path="/create">
            <CreateNew addNew={addNew} setNotification={setNotification} />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <AnecdoteList anecdotes={anecdotes} />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  )
}
Anecdote.propTypes = {
  anecdotes: PropTypes.array.isRequired,
}
export default App
