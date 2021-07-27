// import axios from 'axios';
import React, {Component} from 'react';

// API_KEY: AIzaSyCwMBHagNKMBnjxT_hCxAC1yGzU2M-W6II

class VideoSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            search_input: '',
            selected_video: ''
        }
    }

    // componentDidMount(){
    //     this.searchVideos()
    // }

    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        const search = (this.state.search_input)
        // this.searchVideos(this.state.search_input);
        this.props.searchVideos(search)
    }

    // searchVideos = async () => {
    //     let result = await axios.get(`https://www.googleapis.com/youtube/v3/search/?q=${this.state.search_input}&type=video&videoDuration=any&maxResults=5&key=AIzaSyCwMBHagNKMBnjxT_hCxAC1yGzU2M-W6II`);
    //     this.setState({
    //         videos: result.data,
    //         selected_video: result.data.items[0].id.videoId,
    //         search_input: this.state.search_input
    //     });
    //     // console.log(this.state.videos)
    //     // this.displayVideos()
    // }

    
    // displayVideos = async (event) => {
    //     console.log("State - Videos: ",this.state.videos)
    //     console.log("State - video: ",this.state.videos.items[0].id.videoId)
    //     // let res = await axios.get(`https://www.youtube.com/embed/${this.state.videos.items[0].id.videoId}?autoplay=1&origin=http://example.com`)
    //     // console.log("Player Response: ", res)
    //     // console.log(res.data.items.id.videoId)
    //     // this.setState({
    //     //     thumbnails: res.data
    //     //    });
    //     // this.state.videos.map((video, videoId) => {
    //     //    return(
    //     //     //    key = video_id
    //     //        this.state.video.thumbnails
    //     //    )
    //     // });
    // }

    render() {
        return (
            <React.Fragment>
                <div className="">
                    <form className="text-center"onSubmit={this.onSubmitHandler}>
                        <input type="text" name="search_input"  onChange={this.onChangeHandler} value={this.state.search_input} placeholder="Search for video here." />
                        <button type="submit" className="btn btn-primary w-md-25">Search</button>
                    </form>
                    {/* <iframe src={`https://www.youtube.com/embed/${this.state.selected_video}?autoplay=1&origin=http://example.com`}></iframe> */}
                </div>
            </React.Fragment>
        )
    }
}

export default VideoSearch;