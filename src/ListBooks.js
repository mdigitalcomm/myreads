import React, { Component } from 'react'
import Book from './Book'

class ListBooks extends Component {

	render() {
		const { currentBooks, shelf, onUpdateShelf } = this.props
		let shelvedBooks = currentBooks.filter((obj)=> obj.shelf.toLowerCase() === shelf.replace(/\s/g, '').toLowerCase())
		return (												
			<div className="bookshelf">
				<h2 className="bookshelf-title">
					{this.props.shelf}
				</h2>							
				<div className="bookshelf-books">
					<ol className="books-grid">
						{shelvedBooks.map((shelvedBook) => (	
							<Book key={shelvedBook.id} book={shelvedBook} onUpdateShelf={onUpdateShelf} />
							
						))}
					</ol>
				</div>
			</div>			        										
		)
	}
}

export default ListBooks