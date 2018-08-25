import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
            recVideos: [],
            mainvVideoContent: []
        }
    }

    getRecVideos(videoId) {
        fetch(`http://localhost:5000/api/query/recommended/${videoId}`)
            .then( res => res.json() )
            .then( recVideos => this.setState({ mainvVideoContent:recVideos[1],recVideos:recVideos[0] }))
    }

    renderRecVideos() {
        return this.state.recVideos.map( a => (
            <Link key={a.videoId} style={{textDecoration:'none', color:'#000'}} to={`/watch_vod/${a.videoId}`}>
                <Video 
                    img={a.thumbnail} 
                    title={a.title} 
                    channel_name={a.channelName} 
                    views={a.views}/>
            </Link>
        ))
    }

    componentWillReceiveProps(nextProps){
        if (this.props.match.params.videoId !== nextProps.match.params.videoId) {
            this.getRecVideos(nextProps.match.params.videoId);
            window.scrollTo(0, 0)
        }
    }
    

    componentDidMount() {
        const videoId = this.props.match.params.videoId
        this.getRecVideos(videoId)
        window.scrollTo(0, 0)
    }

    render() {
        return (
            <React.Fragment>
            <NavBar />
            <div className="container">
                <div className="split_main_rec">
                    <div className="video_and_comments_container">
                        <MainVideo videoId={this.props.match.params.videoId}/>
                        <VideoTitle title={this.state.mainvVideoContent.title}/>
                        <UserInteraction 
                            views={this.state.mainvVideoContent.viewCount}/>
                        <UserInfo
                            subCount={this.state.mainvVideoContent.subCount}
                            desc={this.state.mainvVideoContent.desc}
                            thumbnail={this.state.mainvVideoContent.thumbnail} 
                            username={this.state.mainvVideoContent.channelName} 
                            publisedAt={this.state.mainvVideoContent.published}/>
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