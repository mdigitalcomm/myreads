import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
							<Book 
								key={shelvedBook.id} 
								book={shelvedBook} 
								onUpdateShelf={onUpdateShelf} 
							/>							
						))}
					</ol>
				</div>
			</div>			        										
		)
	}
}

ListBooks.propTypes = {
	currentBooks: PropTypes.array.isRequired,
	onUpdateShelf: PropTypes.func.isRequired
}

export default ListBooks