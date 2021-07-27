import React, {Component} from 'react';
import axios from 'axios';
import VideoSearch from './VideoSearch/videoSearch';
import VideoPlayer from './VideoPlayer/VideoPlayer';
import DisplayDescription from './DisplayDescription/DisplayDescription';
import RelatedVideos from './RelatedVideos/RelatedVideos';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            videos: [],
            search_input: '',
            selected_video: '',
            related_videos: [],
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
        let result = await axios.get(`https://www.googleapis.com/youtube/v3/search/?q=BkD2nN5275c$&type=video&videoDuration=any&maxResults=5&key=AIzaSyDtojxK9wETeXnp40Hxzij5IOswBMfcGds`);
        this.setState({
            videos: result.data.items,
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
        let result = await axios.get(`https://www.googleapis.com/youtube/v3/search/?q=${search}&type=video&videoDuration=any&maxResults=5&key=AIzaSyDtojxK9wETeXnp40Hxzij5IOswBMfcGds&part=snippet`);
        this.setState({
            videos: result.data,
            selected_video: result.data.items[0].id.videoId,
            title: result.data.items[0].snippet.title,
            description: result.data.items[0].snippet.description,

        });
        console.log(this.state.selected_video)
        this.relatedVideos()
    }

    relatedVideos = async () => {
        let result = await axios.get(`https://www.googleapis.com/youtube/v3/search/?relatedToVideoId=${this.state.selected_video}&type=video&videoDuration=any&maxResults=5&key=AIzaSyDtojxK9wETeXnp40Hxzij5IOswBMfcGds&part=snippet`);
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
            console.log(this.state.videos)
    }

    render() { 
        return (  
            <React.Fragment>
                <h1>Youtube Clone</h1>
                <VideoSearch videos={this.state.videos} searchVideos={this.searchVideos}  />
                <VideoPlayer default_video={this.state.selected_video}  title={this.state.title} />
                <DisplayDescription title={this.state.title} description={this.state.description}/>
                <RelatedVideos related_thumbnail_0={this.state.thumbnail_video_0} 
                                related_thumbnail_1={this.state.thumbnail_video_1} 
                                related_thumbnail_2={this.state.thumbnail_video_2} 
                                related_thumbnail_3={this.state.thumbnail_video_3} 
                                related_thumbnail_4={this.state.thumbnail_video_4} />
            </React.Fragment>
        );
    }
}
 
export default App;