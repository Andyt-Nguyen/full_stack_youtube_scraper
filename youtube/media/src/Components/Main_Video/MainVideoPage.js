import React, { Component } from 'react'
import NavBar from '../Nav/NavBar'
import MainVideo from './MainVideo'
import VideoTitle from './VideoTitle';
import UserInteraction from './UserInteraction';
import UserInfo from './UserInfo/UserInfo';
import RecommendedVideos from './RecommendedVid/RecommendedVideos';
import './css/main_video.css'
import './css/media_query_471.css'
import './css/media_query_995.css'

export default class MainVideoPage extends Component {
    render () {
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
                    <RecommendedVideos />
                </div>
            </div>
            </React.Fragment>
        )
    }
}