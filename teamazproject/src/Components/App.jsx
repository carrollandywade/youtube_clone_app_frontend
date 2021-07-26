import React, {Component} from 'react';
// import axios from 'axios';
import VideoSearch from './VideoSearch/videoSearch';
// import VideoPlayer from './VideoPlayer/VideoPlayer';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            videos: [
                {videoId: ''},
                {thumbnails: ''}
            ]
        }
    }


    render() { 
        return (  
            <React.Fragment>
                <h1>Youtube Clone</h1>
                <VideoSearch videos={this.state.videos} />
                {/* <VideoPlayer playVideos={this.displayVideos} /> */}
            </React.Fragment>
        );
    }
}
 
export default App;