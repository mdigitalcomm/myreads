import React, { Component } from 'react'
import Book from './Book'

class ListBooks extends Component {

	render() {
		let shelvedBooks = this.props.currentBooks.filter((obj)=> obj.shelf.toLowerCase() === this.props.shelf.replace(/\s/g, '').toLowerCase())
		return (												
			<div className="bookshelf">
				<h2 className="bookshelf-title">
					{this.props.shelf}
				</h2>							
				<div className="bookshelf-books">
					<ol className="books-grid">
						{shelvedBooks.map((shelvedBook) => (	
							<Book book={shelvedBook} onUpdateShelf={this.props.onUpdateShelf} />
							
						))}
					</ol>
				</div>
			</div>			        										
		)
	}
}

export default ListBooks