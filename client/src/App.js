import React, { Component } from 'react';
import './App.css'
import bookAPI from './services/BookService';

class App extends Component {
  constructor() {
    super();

    this.state = {
      books : [{_id: 1, name: 'book one'}, {_id: 2, name: 'book two'}],
      update : false,
      editBookId : 1
    }

  }

  componentDidMount() {

    bookAPI._loadBooks()
    .then(books => this.setState({books}))

    bookAPI._loadBook('5ac51dd11598966454b2543b')
    .then(res => console.log('line 24', res));

  }

  // Book service functions

  submitBook = (event) => {
    event.preventDefault();

    const name = event.target.children[0].value;

      bookAPI._submitBook(name).then((res) => {
        this.setState({books : [...this.state.books, res]})

      });
  }

  deleteBook = (event) => {
    event.preventDefault();

    const idDelete = event.target.getAttribute('data-id');
    
    bookAPI._deleteBook(idDelete).then((oldBookId) => {
      
      let books = this.state.books.filter((book, i) => book._id !== oldBookId)

      this.setState({
        books
      });
    })

  }

  updateBook = (event) => {
    event.preventDefault();

    const name = event.target.children[0].value;

    const id = this.state.editBookId;

    bookAPI._updateBook(id, name).then((res) => {
       let books = this.state.books.map((b) => {
        if (b._id !== id) return b;
        else return res;
       })
       this.setState({books});
      });

  }

  // Edit form service functions

  loadEditForm = (id) => {
    this.setState({update : true}, () => {
      this.setState({editBookId : id});

      let form = document.querySelector('#updateForm')

      let input = form.children[0];

      bookAPI._loadBook(id)
      .then(res => input.value = res[0].name);

    });
  }

  cancelEditForm = () => {
    this.setState({update : false});
  }

  // Page render

  render() {

    return (
      <div className="App">

        <form onSubmit={this.submitBook}>
          <input type="text" placeholder="put in a book" />

          <input type="submit" value="submit book" />
        </form>

        <div id="left"> 
          {this.state.books.map((b) => 
            <p key={b._id}>
             {b._id} <br />
             {b.name}

             <button data-id={b._id} onClick={this.deleteBook}>x</button>

             <button onClick={() => this.loadEditForm(b._id)}>edit</button>
             
            </p>
          )}
        </div>

        <div id="right">

        {(this.state.update) && <div><form id="updateForm" onSubmit={this.updateBook}>
        <input type="text" />
        <input type="hidden" value={this.state.editBookId} />

        <input type="submit" value="update this book" />
        </form><button onClick={this.cancelEditForm}>cancel</button></div>}

        </div>
      </div>
    );
  }
}
export default App;
