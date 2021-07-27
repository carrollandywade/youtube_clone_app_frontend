import axios from 'axios';
import React, {Component} from 'react';

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            selected_video: '', 

         }
    }

    componentDidMount(){
        console.log("Before Axios Call: "+ this.props.selected_video + " <--")
        let result = axios.get(`https://127.0.0.1:8000/comments/${this.props.selected_video}`)
        console.log("After Axios call: ",result)
    }    
    

    render() { 
        return ( 
            <React.Fragment>
                <h1>Comment Component</h1>
            </React.Fragment>
         );
    }
}
 
export default Comments;