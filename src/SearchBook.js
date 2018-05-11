import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

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
            {foundBooks.map((book) => ( 
              <li key={book.id}>
                <div className="book">      
                  <div className="book-top">  
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}>
                    </div>
                    <div className="book-shelf-changer">
                      <select value={book.shelf}
                        onChange={(event) => {
                        this.props.onUpdateShelf(book,event.target.value)
                        this.updateFoundBook(book, event.target.value)
                      }}>
                                        <option value="none" disabled>Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                  
                </div>
              </li>
              
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBook