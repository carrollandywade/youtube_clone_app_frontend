import React, {Component} from 'react';
import axios from 'axios';
import VideoSearch from './VideoSearch/videoSearch';
import VideoPlayer from './VideoPlayer/VideoPlayer';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            videos: [
                {video_id: ''},
                {thumbnails: ''}
            ]
        }
    }

    displayVideos = async (event) => {

        let res = await axios.get(`https://www.googleapis.com/youtube/v3/activities/?${this.state.video.videoId}&snippet=snippet.thumbnails.default.url`)
        console.log(res)
        this.setState({
            thumbnails: res.data
           });
        this.state.videos.map((video, videoId) => {
           return(
            //    key = videoId
               this.state.video.thumbnails
           )
        });
    }

    render() { 
        return (  
            <React.Fragment>
                <VideoSearch videos={this.state.videos} />
                <VideoPlayer playVideos={this.displayVideos} />
            </React.Fragment>
        );
    }
}
 
export default App;
