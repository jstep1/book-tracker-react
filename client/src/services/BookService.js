const bookAPI = {

    _loadBooks: () => {
    return fetch('/books')
        .then(res => res.json())
    },

    _loadBook: (id) => {
    return fetch(`/book/${id}`)
    .then(res => res.json())
    },

    _deleteBook: (id) => {
    return fetch(`/delete/${id}`, {
        method: "DELETE",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
    },

    _updateBook: (id, name) => {
    return fetch(`/book/${id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name})
      }).then(res => res.json())
    },

    _submitBook: (name) => {
    return fetch("/booksinsert", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name})
      }).then(res => res.json())
    }

}

export default bookAPI;