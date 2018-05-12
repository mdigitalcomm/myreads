import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import Book from './Book'

class SearchBook extends Component {

  state = {
    query: '',
    foundBooks: []
  }

  /*update searchbox and books results*/
  searchBook = (query) => {
    this.setState({ query })
    if (query) {
      BooksAPI.search(query)
      .then(books => {      
        /*If the book found matches one on the shelves, mark its shelf*/
        if (books.length > 0) {
          for (let book of books) {
            book.shelf = "none"
            for (let currentBook of this.props.currentBooks) {
              if (book.id === currentBook.id) {
                book.shelf = currentBook.shelf
              } 
            }         
          }
          this.setState({foundBooks: books})
        } else {
          this.setState({foundBooks: []})
        }
        
      })
    } else {
      this.setState({foundBooks: []})
    }
  }

  updateFoundBook = (newBook, shelf) => {
    /*Mark selected as reading, want to read or read*/
    BooksAPI.update(newBook, shelf)
    .then(() => {
      newBook.shelf = shelf
      let updatedBooks = this.state.foundBooks.filter(book=> book.id !== newBook.id)
      updatedBooks.push(newBook)
      this.setState({ foundBooks: updatedBooks })
      /*Move selected book on shelves page*/
      this.props.onUpdateShelf(newBook, shelf)
    })
  }

  render() {
    const { foundBooks, query } = this.state
    foundBooks.sort(sortBy('title'))
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Back</Link>
          <div className="search-books-input-wrapper">
            <input 
              type="text" 
              placeholder="Search books"
              value={query}
              onChange={(event) => this.searchBook(event.target.value)}
            />
          </div>
        </div>

        <div className="search-books-results">
          {query && (
            <div>Found {foundBooks.length} books!</div>
          )}

          <ol className="books-grid">
            {foundBooks.map((foundBook) => ( 
              <Book key={foundBook.id}
                book={foundBook} 
                onUpdateShelf={this.updateFoundBook} 
              />              
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

SearchBook.propTypes = {
  currentBooks: PropTypes.array.isRequired,
  onUpdateShelf: PropTypes.func.isRequired
}

export default SearchBook