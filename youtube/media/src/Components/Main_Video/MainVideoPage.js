import React, { Component } from 'react'
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
            <div className="container">
                <div className="split_main_rec">
                    <div>
                        <MainVideo />
                        <VideoTitle />
                        <UserInteraction />
                        <UserInfo />
                    </div>
                    <RecommendedVideos />
                </div>
            </div>
        )
    }
}