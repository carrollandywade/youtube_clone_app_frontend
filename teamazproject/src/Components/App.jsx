import React, { Component } from 'react';
import axios from 'axios';
import VideoSearch from './VideoSearch';
import RelatedVideos from './RelatedVideos';
import Comments from './Comments';
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed';
import youtube from '../images/youtube.jpg';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      videoId: null,
      videoTitle: null,
      videoDescription: null,
      relatedVideos: []
    }
    this.apiKey = "AIzaSyA5tzaKtSjBEdYCq5LGrLvXDuAFPkLNMEs";
  }

  setVideoDataByTheId = async (id) => {
    let response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${id}&part=snippet&key=${this.apiKey}`);
    let title = response.data.items[0].snippet.title;
    let description = response.data.items[0].snippet.description;
    let relatedVideosArray = await this.getRelatedVideos(id)
    let newState = {
      videoId: id,
      videoTitle: title,
      videoDescription: description,
      relatedVideos: relatedVideosArray
    }
    this.setState(newState);
  }

  searchForVideos = async (searchQuery) => {
      let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${searchQuery}&type=video&part=snippet&key=${this.apiKey}`);
      let id = response.data.items[0].id.videoId;
      this.setVideoDataByTheId(id);
  }

  getRelatedVideos = async (videoId) => { 
      let response = await axios.get (`https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${videoId}&type=video&part=snippet&key=${this.apiKey}`);
      let relatedVideosWithSnippet = response.data.items.filter(video => video.snippet);
      let relatedVideosArray = relatedVideosWithSnippet.map((video) => {
        return ({
            videoId: video.id.videoId,
            videoTitle: video.snippet.title, 
            thumbnailUrl: video.snippet.thumbnails.medium.url});
        });
      return relatedVideosArray
  }

  render(){
    return (
      <div>
        <VideoSearch searchForVideos={this.searchForVideos}/>
        {this.state.videoId ? 
        <div className="container mt-2">
          <div className="row">
            <div className="text-center col-12 col-md-9">
              <h1>{this.state.videoTitle}</h1>
              <ResponsiveEmbed aspectRatio='16by9'>
                <embed title="title" id="ytplayer" type="text/html" 
                src={`https://www.youtube.com/embed/${this.state.videoId}?autoplay=1&origin=http://example.com`}/>
              </ResponsiveEmbed>
              <p className="overflow-auto small" style={{whiteSpace: 'pre-line', maxHeight: '20vh'}}>{this.state.videoDescription}</p>
            </div>
            <div className="col-4 col-md-3">
              <h2 className='text-center'>Related Videos</h2>
              <RelatedVideos relatedVideos={this.state.relatedVideos} apiKey={this.apiKey} displayNewVideo={this.setVideoDataByTheId}/>
            </div>
            <div className='col-8 col-md-9'>
              <Comments videoId={this.state.videoId} replyId={null} key={this.state.videoId}/>
            </div>
          </div>
        </div>
        :
        <h1 className="text-center">Welcome to AZ-Tube, where you can search for videos directly on YouTube</h1>
        }
        <center>
					<img src= {youtube} alt="youtube logo" />
				</center>
      </div>
        
    );
  }
}
  

export default App;
