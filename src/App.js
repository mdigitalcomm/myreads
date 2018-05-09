import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBook from './SearchBook'
import * as BooksAPI from './BooksAPI'

import './App.css'

class BooksApp extends Component {
  state = {
    currentBooks: []
  }

  componentDidMount() {
    this.getAllBooks()
  }

  getAllBooks() {
    BooksAPI.getAll().then((books)=> {
      this.setState({ currentBooks: books })
      console.log(this.state.currentBooks)
    })
  }

  updateShelf = (book, newShelf) => {
    /* move selected book to new shelf, then refresh the shelves*/
    BooksAPI.update(book, newShelf)
    .then(() => this.getAllBooks())
  }



  render() {

    return(
      <div className="app">
        
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>

        <Route exact path="/search" render={() => (
          <SearchBook currentBooks={this.state.currentBooks} onUpdateShelf={this.updateShelf}/>
        )}/>
        
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-content">
              <ListBooks currentBooks={this.state.currentBooks} onUpdateShelf={this.updateShelf} shelf="Currently Reading"/>
              <ListBooks currentBooks={this.state.currentBooks} onUpdateShelf={this.updateShelf} shelf="Want to Read"/>
              <ListBooks currentBooks={this.state.currentBooks} onUpdateShelf={this.updateShelf} shelf="Read"/>
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
