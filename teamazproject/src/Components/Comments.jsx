import React, { Component } from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Reply from './Reply';
import CommentForm from './CommentForm';


class Comments extends Component{
    constructor(props){
        super(props);
        this.state = {
            parents: null,
            replies: null,
        }
        this.open = false
    }

    async componentDidMount(){
        this.getInitialState();
    }

    getInitialState = async () => {
        let newState = await this.getComments();
        this.setState(newState)
    }


    getComments = async () => {
        let response = await axios.get(`http://127.0.0.1:8000/comments/${this.props.videoId}`);
        let allComments = response.data;
        let parentComments = [];
        let replies = [];
        for (let i=0; i<allComments.length; i++){
            let comment = allComments[i];
            if (comment.replyToId === null){
                parentComments.push(comment);
            }
            else{
                replies.push(comment);
            }
        }
        let newState = {
            parents: parentComments, 
            replies: replies
        }
        return newState
    }

    commentDisplay = () => {
        let parents = this.state.parents.reverse();
        let allReplies = this.state.replies;
        let display = parents.map((parent) => {
            let replies = allReplies.filter((reply) => {
                return (reply.replyToId === parent.id)
            });
            let displayReplies = replies.map((entry) => {
                return(
                    <React.Fragment>
                        <Alert variant='light' className='text-left'>{entry.name} says: {entry.comment}</Alert>
                    </React.Fragment>
                )
            })
            return(
            <div>
                    <Alert variant='dark'>
                        <Alert variant='light' >{parent.comment}</Alert>
                        <div className='container m-2'>
                            <div className='row'>
                                <div className='col-6 col-sm-4'>
                                    <Button className='btn btn-dark btn-sm' onClick={() => this.likeComment(parent.id)}>Like ({parent.likes})</Button>
                                </div>
                                <div className='col-6 col-sm-4'>
                                    <Button className='btn btn-dark btn-sm' onClick={() => this.dislikeComment(parent.id)}>Dislike ({parent.dislikes})</Button>
                                </div>
                                <div className='col-sm-4 text-center mt-2 mt-sm-0'>
                                    <Reply videoId={this.props.videoId} replyId={parent.id} refresh={this.getInitialState}/>
                                </div>
                            </div>
                        </div>
                        <h3>Replies</h3>
                        {displayReplies}
                    </Alert>
            </div>
            )
        })
        return display
    }

    likeComment = async (commentId) => {
        try{
            await axios.get(`http://127.0.0.1:8000/comments/likes/${commentId}`);
            this.getInitialState()
        }
        catch(err){
            alert(err)
        }
    }

    dislikeComment = async (commentId) => {
        try{
            await axios.get(`http://127.0.0.1:8000/comments/dislikes/${commentId}`);
            this.getInitialState()
        }
        catch(err){
            alert(err)
        }
    }

    render(){
        return(
            <CommentForm videoId={this.props.videoId} refresh={this.getInitialState}/>
        )
    }
}

export default Comments;