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
            selected_video: '',
            related_video_0: '',
            related_video_1: '',
            related_video_2: '',
            related_video_3: '',
            related_video_4: '',
            thumbnail_video_0: '',
            thumbnail_video_1: '',
            thumbnail_video_2: '',
            thumbnail_video_3: '',
            thumbnail_video_4: '',
        }
    }
    componentDidMount() {
        this.defaultVideo()
    }
    defaultVideo = async () => {
        let result = await axios.get(`https://www.googleapis.com/youtube/v3/search/?q=BkD2nN5275c$&type=video&videoDuration=any&maxResults=5&key=AIzaSyDPRvkeCRQj03kouGwoU9Vfs84NQDnOmUw`);
        this.setState({
            videos: result.data,
            selected_video: result.data.items[0].id.videoId,
            // related_video_1: result.data.items[1].id.videoId,
        });
        console.log(this.state.selected_video)
        this.relatedVideos()
        // console.log(this.state.related_video_1)
        // this.displayVideos()
    }

    searchVideos = async (search) => {
        console.log(search)
        console.log(this.state.search_input)
        let result = await axios.get(`https://www.googleapis.com/youtube/v3/search/?q=${search}&type=video&videoDuration=any&maxResults=5&key=AIzaSyDPRvkeCRQj03kouGwoU9Vfs84NQDnOmUw`);
        this.setState({
            videos: result.data,
            selected_video: result.data.items[0].id.videoId,
            // search_input: this.state.search_input
        });
        console.log(this.state.selected_video)
        this.relatedVideos()
    }

    relatedVideos = async () => {
        let result = await axios.get(`https://www.googleapis.com/youtube/v3/search/?relatedToVideoId=${this.state.selected_video}&type=video&videoDuration=any&maxResults=5&key=AIzaSyDPRvkeCRQj03kouGwoU9Vfs84NQDnOmUw&part=snippet`);
        this.setState({
            related_video_1: result.data.items[0].id.videoId,
            related_video_1: result.data.items[1].id.videoId,
            related_video_2: result.data.items[2].id.videoId,
            related_video_3: result.data.items[3].id.videoId,
            related_video_4: result.data.items[4].id.videoId,
            thumbnail_video_0: result.data.items[0].snippet.thumbnails.default.url,
            thumbnail_video_1: result.data.items[1].snippet.thumbnails.default.url,
            thumbnail_video_2: result.data.items[2].snippet.thumbnails.default.url,
            thumbnail_video_3: result.data.items[3].snippet.thumbnails.default.url,
            thumbnail_video_4: result.data.items[4].snippet.thumbnails.default.url,

        })
        console.log(this.state.related_video_0)
        console.log(this.state.related_video_1)
        console.log(this.state.related_video_2)
        console.log(this.state.related_video_3)
        console.log(this.state.related_video_4)
        console.log(this.state.selected_video)
        console.log(this.state.thumbnail_video_0)
        console.log(this.state.thumbnail_video_1)
        console.log(this.state.thumbnail_video_2)
        console.log(this.state.thumbnail_video_3)
        console.log(this.state.thumbnail_video_4)
    }

    render() { 
        return (  
            <React.Fragment>
                <h1>Youtube Clone</h1>
                <VideoSearch videos={this.state.videos} searchVideos={this.searchVideos}/>
                <VideoPlayer default_video={this.state.selected_video}/>
                <div>
                    <img src={this.state.thumbnail_video_0} />
                    <img src={this.state.thumbnail_video_1} />
                    <img src={this.state.thumbnail_video_2} />
                    <img src={this.state.thumbnail_video_3} />
                    <img src={this.state.thumbnail_video_4} />
                </div>
            </React.Fragment>
        );
    }
}
 
export default App;