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
    BooksAPI.getAll().then((books)=> {
      this.setState({ books })
    })
  }



  render() {

    return(
      <div className="app">
        
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
        
        <Route exact path="/search" component={SearchBook} />
        
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-content">
              <ListBooks books={this.state.books} shelf="currentlyReading"/>
              <ListBooks books={this.state.books} shelf="wantToRead"/>
              <ListBooks books={this.state.books} shelf="read"/>
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
