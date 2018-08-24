import React, { Component } from 'react'
import NavBar from '../Nav/NavBar'
import MainVideo from './SubComponents/MainVideo'
import VideoTitle from './SubComponents/VideoTitle';
import UserInteraction from './SubComponents/UserInteraction';
import UserInfo from './UserInfo/UserInfo';
import RecommendedVideos from './SubComponents/RecommendedVid/RecommendedVideos';
import Video from './SubComponents/RecommendedVid/SubComponents/Video';
import './css/main_video.css'
import './css/media_query_471.css'
import './css/media_query_995.css'

export default class MainVideoPage extends Component {
    constructor() {
        super()
        this.state = {
            recVideos: []
        }
    }

    getRecVideos() {
        const videoId = this.props.match.params.videoId
        fetch(`http://localhost:5000/api/query/recommended/${videoId}`)
            .then( res => res.json() )
            .then( recVideos => this.setState({ recVideos }))
    }

    renderRecVideos() {
        return this.state.recVideos.map( a => (
            <Video 
                img={a.thumbnail} 
                title={a.title} 
                channel_name={a.channelName} 
                views={a.views}/>
        ))
    }

    componentDidMount() {
        this.getRecVideos()
    }

    render() {
        console.log(this.props)
        return (
            <React.Fragment>
            <NavBar />
            <div className="container">
                <div className="split_main_rec">
                    <div className="video_and_comments_container">
                        <MainVideo videoId={this.props.match.params.videoId}/>
                        <VideoTitle />
                        <UserInteraction />
                        <UserInfo />
                    </div>
                    <RecommendedVideos>
                        {this.renderRecVideos()}
                    </RecommendedVideos>
                </div>
            </div>
            </React.Fragment>
        )
    }
}