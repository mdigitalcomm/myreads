import React, { Component } from 'react'

class Book extends Component {
	render() {
		let { book, onUpdateShelf } = this.props
		let bgImage = book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : "#"
		let authors = book.authors ? book.authors.map(author => <div key={author}>{author}</div>): "Authors Unknown"
		return (
			<li>
				<div className="book">
					<div className="book-top">
						<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${bgImage})` }}>
						</div>
						<div className="book-shelf-changer">
							<select value={book.shelf} 
								onChange={(event) => 
								onUpdateShelf(book, event.target.value)
								}>
								<option value="select" disabled>Move to...</option>
								<option value="currentlyReading">Currently Reading</option>
								<option value="wantToRead">Want to Read</option>
								<option value="read">Read</option>
								<option value="none">None</option>
							</select>
						</div>
					</div>
					<div className="book-title">{book.title || "No title"}</div>
					<div className="book-authors">{authors}</div>
				</div>
			</li>
		)
	}
}

export default Book