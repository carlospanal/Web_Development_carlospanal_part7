describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'testname',
      username: 'testusername',
      password: 'testpassword'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened and has login', function() {
    cy.contains('blogs')
    cy.contains('Login')
    cy.wait(100)
    cy.contains('page loaded')
  })

  it('succeeds with right credentials', function() {
    cy.get('#username').type('testusername')
    cy.get('#password').type('testpassword')
    cy.get('#login-button').click()
    cy.contains('successful login')
    cy.get('.greenmessage').should('have.css', 'color', 'rgb(0, 128, 0)')
  })

  it('fails with wrong credentials', function() {
    cy.get('#username').type('testusername')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()
    cy.contains('wrong credentials')
    cy.get('.redmessage').should('have.css', 'color', 'rgb(255, 0, 0)')
  })

})

describe('when logged in', function() {
  beforeEach(function() {
    /*cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'testname',
      username: 'testusername',
      password: 'testpassword'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)*/
    cy.login({ username: 'testusername', password: 'testpassword' })
  })

  it('a new blog can be created', function() {
    cy.contains('new blog').click()
    cy.get('#title').type('testtitle')
    cy.get('#author').type('testauthor')
    cy.get('#url').type('testurl')
    cy.contains('submit new blog').click()
    cy.contains('testtitle')
    cy.contains('testauthor')
  })
  describe('and a blog exists', function () {


    it('can raise likes', function() {
      cy.createBlog({ title:'testtitle2', author:'testauthor2', ur:'testurl2' })
      cy.contains('testtitle2').as('theBlog')
      cy.get('@theBlog').contains('details').click()
      cy.get('@theBlog').find('.likeButton').click()
      cy.get('@theBlog').contains('Likes 1')

    })
    it('blogs are ordered by likes', function() {
      cy.get('.blogDiv').first().contains('Likes 1')
    })
    it('can delete the blog', function() {
      cy.contains('testtitle2').as('theBlog')
      cy.get('@theBlog').contains('details').click()
      cy.get('@theBlog').contains('DELETE').click()
      cy.get('html').should('not.contain', 'testtitle2')
    })
  })

  // ...
})