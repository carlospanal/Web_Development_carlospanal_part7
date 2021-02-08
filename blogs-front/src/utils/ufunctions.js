const usersList = (blogs) => {
  const reducer = (userVar, blog) => {
    const userVarc = userVar

    const filteredAuthor = userVarc.filter((userVVar) => userVVar.id === blog.user.id)

    if (filteredAuthor.length > 0) {
      return userVarc.map((userVVar) => {
        if (userVVar.id === blog.user.id) {
          const modVar = userVVar
          modVar.blogs += 1
          modVar.blogTitles = modVar.blogTitles.concat(blog.title)
          return modVar
        }
        return userVVar
      })
    }
    return userVarc.concat({ name: blog.user.name, blogs: 1, id: blog.user.id, blogTitles: [blog.title] })
  }

  const groupedUsers = blogs.reduce(
    reducer,
    [],
  )
  console.log(groupedUsers)
  return groupedUsers
}

export default {
  usersList,
}