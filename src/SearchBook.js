import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBook extends Component {


  state = {
    query: '',
    foundBooks: []
  }

  /*update searchbox and books results*/
  searchBook = (query) => {
    this.setState({ query: query.trim() })
    BooksAPI.search(query)
    .then(books => {      
      /*If the book found is on current shelf already, set the state for its shelf*/
      for (let book of books) {
        book.shelf = "none"
        for (let currentBook of this.props.currentBooks) {
          if (book.id === currentBook.id) {
            book.shelf = currentBook.shelf
          } 
        }         
      }
      this.setState({foundBooks: books})
    })
  }

  updateFoundBook = (newBook, shelf) => {
    /*Mark selected as reading, want to read or read*/
    BooksAPI.update(newBook, shelf)
    .then(() => {
      newBook.shelf = shelf
      let updatedBooks = this.state.foundBooks.filter(book=> book.id !== newBook.id)
      updatedBooks.push(newBook)
      this.setState({ foundBooks: updatedBooks })
      this.props.onUpdateShelf(newBook, shelf)
      console.log(this.state.foundBooks)
    })
  }



  render() {
    const { foundBooks } = this.state
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Back</Link>
          <div className="search-books-input-wrapper">
            <input 
              type="text" 
              placeholder="Search books"
              value={this.state.query}
              onChange={(event) => this.searchBook(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
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

export default SearchBook