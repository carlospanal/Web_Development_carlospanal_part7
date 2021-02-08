// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => sum + blog.likes
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (blogVar, blog) => {
    const blogVarc = blogVar
    if (blog.likes > blogVar.likes) {
      blogVarc.likes = blog.likes
      blogVarc.title = blog.title
      blogVarc.author = blog.author
    }
    return blogVarc
  }

  return blogs.reduce(
    reducer,
    { title: '', author: '', likes: -1 },
  )
}

const mostBlogs = (blogs) => {
  const reducer = (blogVar, blog) => {
    const blogVarc = blogVar

    const filteredAuthor = blogVarc.filter((blogVVar) => blog.author === blogVVar.author)

    if (filteredAuthor.length > 0) {
      return blogVarc.map((blogVVar) => {
        if (blogVVar.author === blog.author) {
          const modVar = blogVVar
          modVar.blogs += 1
          return modVar
        }
        return blogVVar
      })
    }
    return blogVarc.concat({ author: blog.author, blogs: 1 })
  }

  const groupedAuthors = blogs.reduce(
    reducer,
    [{ author: '', blogs: 0 }],
  )
  const reducer2 = (blogVar, authorVar) => {
    const blogVarc = blogVar
    if (authorVar.blogs > blogVar.blogs) {
      blogVarc.blogs = authorVar.blogs
      blogVarc.author = authorVar.author
    }
    return blogVarc
  }

  return groupedAuthors.reduce(
    reducer2,
    { author: '', blogs: 0 },
  )
}

const mostLikes = (blogs) => {
  const reducer = (blogVar, blog) => {
    const blogVarc = blogVar

    const filteredAuthor = blogVarc.filter((blogVVar) => blog.author === blogVVar.author)

    if (filteredAuthor.length > 0) {
      return blogVarc.map((blogVVar) => {
        if (blogVVar.author === blog.author) {
          const modVar = blogVVar
          modVar.likes += blog.likes
          return modVar
        }
        return blogVVar
      })
    }
    return blogVarc.concat({ author: blog.author, likes: blog.likes })
  }

  const groupedAuthors = blogs.reduce(
    reducer,
    [{ author: '', likes: 0 }],
  )
  const reducer2 = (blogVar, authorVar) => {
    const blogVarc = blogVar
    if (authorVar.likes > blogVar.likes) {
      blogVarc.likes = authorVar.likes
      blogVarc.author = authorVar.author
    }
    return blogVarc
  }

  return groupedAuthors.reduce(
    reducer2,
    { author: '', likes: 0 },
  )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
