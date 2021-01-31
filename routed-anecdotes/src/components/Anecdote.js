/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import {
  useParams,
} from 'react-router-dom'

const Anecdote = ({ anecdotes }) => {
  console.log(anecdotes)
  const { id } = useParams()
  const anecdote = anecdotes.find((n) => n.id === Number(id))
  return (
    <div>
      <h2>{anecdote.content}</h2>
    </div>
  )
}

Anecdote.propTypes = {
  anecdotes: PropTypes.array.isRequired,
}
export default Anecdote
