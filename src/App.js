import React from 'react';
import './App.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    const url = 'https://jsonplaceholder.typicode.com/posts'
    fetch(url, {
      method: 'GET'
    }).then(res => res.json()).then(posts => {
      this.setState({posts: posts})
    })
  }

  deleteRow(id) {
    const index = this.state.posts.findIndex(post => post.id === id);
    this.setState({
      posts: [...this.state.posts.slice(0, index), ...this.state.posts.slice(index+1)]
    })
  }

  render() {
    const columns = [
      {
        Header: 'User ID',
        accessor: 'userId',
        style: {
          textAlign: 'center'
        },
        width: 100,
        maxWidth: 100,
        minWidth: 100,
      },
      {
        Header: 'ID',
        accessor: 'id',
        style: {
          textAlign: 'center',
        },
        width: 100,
        maxWidth: 100,
        minWidth: 100,
      },
      {
        Header: 'Title',
        accessor: 'title'
      },
      {
        Header: 'Content',
        accessor: 'body'
      },
      {
        Header: 'Actions',
        Cell: props => {
          return (
            <button onClick={() => {
              this.deleteRow(props.original.id);
            }}>Delete</button>
          )
        },
        sortable: false,
        filterable: false,
        width: 100,
        maxWidth: 100,
        minWidth: 100,
      },
    ]
    return (
      <ReactTable
        columns={columns}
        data={this.state.posts}
        filterable
        defaultPageSize={20}
      >

      </ReactTable>
    )
  }
}