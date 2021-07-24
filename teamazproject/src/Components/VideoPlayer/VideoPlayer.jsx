import React, { Component } from 'react';
import axios  from  'axios';

class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
    
            vidoes: [
                {video_id:''}
            ], 

            comment: [
                {text:''},
                {likes:''},
                {dislikes:''}
            ]
         };
    }

    componentDidMount(){
        this.getVideod();
    }

    getVideoId = async () => {
        let res = await axios.get(`https://www.googleapis.com/youtube/v3/search?q={this.state.videos.videoId}&key=API_KEY:AIzaSyCwMBHagNKMBnjxT_hCxAC1yGzU2M-W6II`)
        console.log(res);
        this.setState({
            comment: res.data.items,
            videos: this.props.videos,
        })
    }

    render() { 
        return ( 
            <React.Fragment>
                <container fluid > 
                <iframe style={{position: 'relative', top: '0px'}}
                id="display"
                width="640" 
                height="360" 
                title="Main Video Player"
                src={`https://www.youtube.com/embed/${this.state.videos.video_id}?autoplay=0&origin=http://example.com`}
                padding="0">
                </iframe>
                </container>
            </React.Fragment>
         );
    }
}
 
export default VideoPlayer;