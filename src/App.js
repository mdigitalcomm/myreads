import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

// import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBook from './SearchBook'
import * as BooksAPI from './BooksAPI'

import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    this.getAllBooks()
  }

  getAllBooks() {
    BooksAPI.getAll().then((books)=> {
      this.setState({ books })
    })
  }

  updateBook = (book, newShelf) => {
    /* move selected book to new shelf, then refresh the shelves*/
    BooksAPI.update(book, newShelf)
    .then(() => {
      this.getAllBooks()
    })
  }



  render() {

    return(
      <div className="app">
        
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>

        <Route exact path="/search" render={() => (
          <SearchBook onUpdateBook={this.updateBook}/>
        )}/>
        
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-content">
              <ListBooks books={this.state.books} onUpdateBook={this.updateBook} shelf="Currently Reading"/>
              <ListBooks books={this.state.books} onUpdateBook={this.updateBook} shelf="Want to Read"/>
              <ListBooks books={this.state.books} onUpdateBook={this.updateBook} shelf="Read"/>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>    
          </div>   
        )}/>

      </div>
    )
  }
}
  

export default BooksApp
