import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBook from './SearchBook'
import * as BooksAPI from './BooksAPI'

import './App.css'

class BooksApp extends Component {
  state = {
    currentBooks: [],
    shelves:["Currently Reading", "Want to Read", "Read"]
  }

  componentDidMount() {
    this.getAllBooks()
  } 

  getAllBooks = () => {
    BooksAPI.getAll().then((books)=> {
      this.setState({ currentBooks: books })
    })
  }

  updateShelf = (book, newShelf) => {
    /* move selected book to new shelf, then refresh the shelves*/
    BooksAPI.update(book, newShelf)
    .then(() => this.getAllBooks())
  }

  render() {
    const { shelves, currentBooks } = this.state

    return(
      <div className="app">
        
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>

        <Route exact path="/search" render={() => (
          <SearchBook 
            currentBooks={currentBooks} 
            onUpdateShelf={this.updateShelf}
          />
        )}/>
        
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-content">
              {shelves.map((shelf) => (
                <ListBooks 
                  key={shelf} 
                  currentBooks={currentBooks} 
                  onUpdateShelf={this.updateShelf} 
                  shelf={shelf} />
              ))}
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