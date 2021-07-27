// import axios from 'axios';
import React, {Component} from 'react';


class VideoSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            search_input: '',
            selected_video: ''
        }
    }

  

    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        const search = (this.state.search_input)
        this.props.searchVideos(search)
    }

    render() {
        return (
            <React.Fragment>
                <div className="">
                    <form className="text-center"onSubmit={this.onSubmitHandler}>
                        <input type="text" name="search_input"  onChange={this.onChangeHandler} value={this.state.search_input} placeholder="Search for video here." />
                        <button type="submit" className="btn btn-primary w-md-25">Search</button>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default VideoSearch;