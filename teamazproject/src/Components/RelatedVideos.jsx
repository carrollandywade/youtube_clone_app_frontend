import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'

const RelatedVideos = (props) => {

    function createLinksForRelatedVideos() {

        return props.relatedVideos.map((video) => {
            return (
                <ListGroup.Item key={video.videoId}>
                    <Image src={video.thumbnailUrl} alt="video thumbnail" rounded style={{width: "100%", height: "100%"}}/>
                    <Button className='btn btn-dark btn-sm' variant='link' onClick={() => props.displayNewVideo(video.videoId)}>{video.videoTitle}</Button>
                </ListGroup.Item>
            );
        });
    }
        return (
            <div>
                <ListGroup className="overflow-auto small text-center" style={{maxHeight: '70vh'}}>
                    {createLinksForRelatedVideos()}
                </ListGroup>
            </div>
        );
}
 
export default RelatedVideos;