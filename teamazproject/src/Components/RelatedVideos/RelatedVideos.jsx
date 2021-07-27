import React, { Component } from 'react';

const RelatedVideos = (props) => {
    return ( 
        <div>
            <img src={props.related_thumbnail_0} />
            <img src={props.related_thumbnail_1} />
            <img src={props.related_thumbnail_2} />
            <img src={props.related_thumbnail_3} />
            <img src={props.related_thumbnail_4} />
        </div>
     );
}
 
export default RelatedVideos;