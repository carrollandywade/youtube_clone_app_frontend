import React, {Component} from 'react';
import Video from './VideoPlayer/VideoPlayer';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            videos: []
        }
    }

    render() { 
        return (  
            <React.Fragment>
                <Video />
            </React.Fragment>
        );
    }
}
 
export default App;
