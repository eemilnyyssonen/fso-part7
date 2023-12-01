describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const firstUser = {
      name: 'Admin',
      username: 'admin',
      password: 'pass'
    }
    cy.request('POST', 'http://localhost:3003/api/users', firstUser)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('login')
    cy.get('#username')
    cy.get('#password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('admin')
      cy.get('#password').type('pass')
      cy.get('#login-button').click()

      cy.contains('Admin logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('admin')
      cy.get('#password').type('word')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'admin', password: 'pass' })
    })

    it('a blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title-input').type('blog created by cypress')
      cy.get('#author-input').type('cypress')
      cy.get('#url-input').type('www.cypress.io')
      cy.get('#submit-button').click()
      cy.contains('blog created by cypress')
    })

    it('can log out', function() {
      cy.contains('logout').click()
      cy.contains('Admin logged in').should('not.exist')
      cy.contains('log in to application')
    })

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'blog created by cypress', author: 'cypress', url: 'www.cypress.io' })
      })
      
      it('users can like a blog', function() {
        cy.contains('blog created by cypress')
        cy.contains('view').click()
        cy.get('#like-button').click()
        cy.contains('likes 1')
      })

      it('user who created the blog can remove', function() {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.contains('blog created by cypress').should('not.exist')
      })

      describe('other user logs in', function() {
        beforeEach(function() {
          const secondUser = {
            name: 'tester',
            username: 'user',
            password: 'secret'
          }
          cy.request('POST', 'http://localhost:3003/api/users', secondUser)
          cy.contains('logout').click()
          cy.login({ username: 'user', password: 'secret' })
        })

        it('should not be able to remove blog added by another user', function() {
          cy.contains('view').click()
          cy.contains('remove').should('not.exist')
        })
      })

    })
    
    describe('and multiple blogs exist', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'first blog', author: 'cypress', url: 'www.cypress.io' })
        cy.createBlog({ title: 'second blog', author: 'cypress', url: 'www.cypress.io', likes: 2 })
        cy.createBlog({ title: 'third blog', author: 'cypress', url: 'www.cypress.io', likes: 1 })
      })

      it('initial blogs are ordered by blog with most likes being first', function() {
        cy.get('.blog').eq(0).should('contain', 'second blog')
        cy.get('.blog').eq(1).should('contain', 'third blog')
        cy.get('.blog').eq(2).should('contain', 'first blog')
      })

      it('liking a blog updates the order', function() {
        cy.contains('first blog')
          .contains('view')
          .click()
        cy.get('#first-blog')
          .find('.showableContent')
          .find('#like-button')
          .as('likebutton')
        
        cy.get('@likebutton').click()
        cy.get('@likebutton').click()
        
        cy.get('.blog').eq(0).should('contain', 'second blog')
        cy.get('.blog').eq(1).should('contain', 'first blog')
        cy.get('.blog').eq(2).should('contain', 'third blog')
      })
    })

  })
})