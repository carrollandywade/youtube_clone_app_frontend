import React, {Component} from 'react';
import axios from 'axios';
import VideoSearch from './VideoSearch/videoSearch';
import VideoPlayer from './VideoPlayer/VideoPlayer';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            videos: [],
            search_input: '',
            selected_video: ''
        }
    }
    componentDidMount() {
        this.defaultVideo()
    }
    defaultVideo = async () => {
        let result = await axios.get(`https://www.googleapis.com/youtube/v3/search/?q=BkD2nN5275c$&type=video&videoDuration=any&maxResults=5&key=AIzaSyC7Nfr75k-uhIlTRn5H1XHWvP0Fl9zM8Pg`);
        this.setState({
            videos: result.data,
            selected_video: result.data.items[0].id.videoId,
        });
        console.log(this.state.selected_video)
        // this.displayVideos()
    }

    searchVideos = async (search) => {
        console.log(search)
        console.log(this.state.search_input)
        let result = await axios.get(`https://www.googleapis.com/youtube/v3/search/?q=${search}&type=video&videoDuration=any&maxResults=5&key=AIzaSyC7Nfr75k-uhIlTRn5H1XHWvP0Fl9zM8Pg`);
        this.setState({
            videos: result.data,
            selected_video: result.data.items[0].id.videoId,
            // search_input: this.state.search_input
        });
        console.log(this.state.selected_video)
    }

    render() { 
        return (  
            <React.Fragment>
                <h1>Youtube Clone</h1>
                <VideoSearch videos={this.state.videos} searchVideos={this.searchVideos}/>
                <VideoPlayer default_video={this.state.selected_video}/>
            </React.Fragment>
        );
    }
}
 
export default App;