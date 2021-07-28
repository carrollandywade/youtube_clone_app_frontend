import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

class VideoSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            searchQuery: ''
         }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.searchForVideos(this.state.searchQuery)
    }

    render() { 
        return ( 
            <div className="d-flex justify-content-center">
                <Form className="w-100 text-center" onSubmit={this.handleSubmit}> 
                    <Form.Group controlId="searchBar" >
                        <Form.Control type="text" placeholder="Search for videos" name="searchQuery" value={this.state.searchQuery} onChange={this.handleChange}/> 
                    </Form.Group>
                    <Button className='btn btn-dark btn-sm'width="100" variant="primary" type="submit">Search</Button>
                </Form>
            </div>
         );
    }
}
 
export default VideoSearch;