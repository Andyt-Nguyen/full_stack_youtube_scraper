import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import NavBar from '../Nav/NavBar'
import MainVideo from './SubComponents/MainVideo'
import VideoTitle from './SubComponents/VideoTitle'
import UserInteraction from './SubComponents/UserInteraction'
import UserInfo from './UserInfo/UserInfo'
import RecommendedVideos from './SubComponents/RecommendedVid/RecommendedVideos'
import Video from './SubComponents/RecommendedVid/SubComponents/Video'
import { VideoSkeletonLoader } from '../Common'
import TitleLoader from './SubComponents/Loader/TitleLoader'
import UserInteractionLoader from './SubComponents/Loader/UserInteractionLoader'
import UserInfoLoader from './SubComponents/Loader/UserInfoLoader'
import MainVideoLoader from './SubComponents/Loader/MainVideoLoader'

import './css/main_video.css'
import './css/media_query_471.css'
import './css/media_query_995.css'

export default class MainVideoPage extends Component {
    constructor() {
        super()
        this.state = {
            recVideos: null,
            mainvVideoContent: null,
            iconColorRed: '#b1b1b1',
            iconColorBlue: '#b1b1b1',
            isFavorited: false,
            isLiked: false
        }
    }


    onMouseEnterRed() {
        this.setState({iconColorRed:'red'})
    }

    onMouseLeaveRed() {
        this.setState({iconColorRed:'#b1b1b1'})
    }

    onMouseEnterBlue() {
        this.setState({iconColorBlue:'dodgerblue'})
    }

    onMouseLeaveBlue() {
        this.setState({iconColorBlue:'#b1b1b1'})
    }

    checkUserCategs(url, state) {
        try{
            const { username } = JSON.parse(localStorage.getItem('auth_token'))
            fetch(`http://localhost:5000/api/users/${url}/${username}`)
                .then(res => res.json())
                .then(data => {
                    const findLikedVideo = data.videos.filter( a => a.video_id == this.props.match.params.videoId);
                    console.log(findLikedVideo)
                    if(findLikedVideo.length < 1) this.setState({[state]:false})
                    else if(findLikedVideo.length >= 1) this.setState({[state]:true})
                });
        } catch(e) {
            return ''
        }   
    }

    removeVideo(url, state) {
        try {
            const { token } = JSON.parse(localStorage.getItem('auth_token'))
            const { videoId } = this.props.match.params
            axios.defaults.headers.common['Authorization'] = "Bearer " + token
            axios.delete(`http://localhost:5000/api/users/${url}/${videoId}`,)
                .then(res => this.setState({[state]:false}))
        
        } catch(e) {
            console.log('User not authed')
        }
    }


    saveToUserProfile(url, state) {
        try {
            const { token, user_id, username } = JSON.parse(localStorage.getItem('auth_token'))
            const { videoId:video_id } = this.props.match.params
            fetch(`http://localhost:5000/api/users/${url}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    username,user_id,video_id,
                    title:this.state.mainvVideoContent.title,
                    channel_name:this.state.mainvVideoContent.channelName,
                    thumbnail:this.props.location.state.vidThumbnail,
                    views:this.state.mainvVideoContent.viewCount, 
                    published_at:this.state.mainvVideoContent.published})
            })
            .then(res => this.setState({[state]:true}))
            .catch( err => console.log(err))
        } catch(error) {
            console.log(error)
        }
    }
    

    saveToUserHistory() {
        try {
            const { token, user_id, username } = JSON.parse(localStorage.getItem('auth_token'))
            const { videoId:video_id } = this.props.match.params
            fetch('http://localhost:5000/api/users/saveHistory', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    username,user_id,video_id,
                    title:this.state.mainvVideoContent.title,
                    channel_name:this.state.mainvVideoContent.channelName,
                    thumbnail:this.props.location.state.vidThumbnail,
                    views:this.state.mainvVideoContent.viewCount, 
                    published_at:this.state.mainvVideoContent.published})
            }).catch( err => console.log(err))
        } catch(error) {
            console.log(error)
        }
    }

    getRecVideos(videoId, cb) {
        fetch(`http://localhost:5000/api/query/recommended/${videoId}`)
            .then( res => res.json() )
            .then( recVideos => this.setState({ mainvVideoContent:recVideos[1],recVideos:recVideos[0]}, () => cb()))
    }

    renderRecVideos() {
        return this.state.recVideos.map( a => (
            <Link 
                key={a.videoId} 
                style={{textDecoration:'none', color:'#000'}} 
                to={{
                    pathname:`/watch_vod/${a.videoId}`, 
                    state:{vidThumbnail:a.thumbnail}
                    }}>
                <Video 
                    img={a.thumbnail} 
                    title={a.title} 
                    channel_name={a.channelName} 
                    views={a.views}/>
            </Link>
        ))
    }
    
    renderSkeletonLoader() {
        const placeholder = [1,2,3,4,5,6,7]
        return placeholder.map( a => <VideoSkeletonLoader key={a} displayFlex={true}/>)
    }

    
    componentWillReceiveProps(nextProps){
        this.setState({recVideos:null, mainvVideoContent:null})
        if (this.props.match.params.videoId !== nextProps.match.params.videoId) {
            this.getRecVideos(nextProps.match.params.videoId, this.saveToUserHistory.bind(this))
            window.scrollTo(0, 0)
        }
    }

    
    componentDidMount() {
        this.checkUserCategs("getUserLikes", 'isLiked');
        this.checkUserCategs("getUserFavorites", 'isFavorited');
        const videoId = this.props.match.params.videoId
        this.getRecVideos(videoId, this.saveToUserHistory.bind(this))
        window.scrollTo(0, 0)
    }

    render() {
        return (
            <React.Fragment>
            <NavBar />
            <div className="container">
                <div className="split_main_rec">
                    <div className="video_and_comments_container">
                        {
                            this.state.mainvVideoContent == null
                            ? <MainVideoLoader />
                            : <MainVideo videoId={this.props.match.params.videoId} />
                        }
                        
                        {
                            this.state.mainvVideoContent == null
                            ? <TitleLoader />
                            : <VideoTitle title={this.state.mainvVideoContent.title} />
                        }
                        
                        { 
                            this.state.mainvVideoContent == null
                            ? <UserInteractionLoader />
                            : <UserInteraction
                                isLiked={this.state.isLiked}
                                isFavorited={this.state.isFavorited}
                                onMouseEnterBlue={this.onMouseEnterBlue.bind(this)}
                                onMouseLeaveBlue={this.onMouseLeaveBlue.bind(this)}
                                onMouseEnterRed={this.onMouseEnterRed.bind(this)}
                                onMouseLeaveRed={this.onMouseLeaveRed.bind(this)}
                                iconColorRed={this.state.iconColorRed}
                                iconColorBlue={this.state.iconColorBlue}
                                saveVideo={this.saveToUserProfile.bind(this)}
                                removeVideo={this.removeVideo.bind(this)} 
                                views={this.state.mainvVideoContent.viewCount}/>
                        }

                        {
                            this.state.mainvVideoContent == null
                            ? <UserInfoLoader />
                            : <UserInfo
                                subCount={this.state.mainvVideoContent.subCount}
                                desc={this.state.mainvVideoContent.desc}
                                thumbnail={this.state.mainvVideoContent.thumbnail} 
                                username={this.state.mainvVideoContent.channelName} 
                                publishedAt={this.state.mainvVideoContent.published}/>
                        }
                       
                        
                    </div>
                    <RecommendedVideos>
                        {
                            this.state.recVideos == null
                            ? this.renderSkeletonLoader()
                            : this.renderRecVideos()
                        }
                    </RecommendedVideos>
                </div>
            </div>
            </React.Fragment>
        )
    }
}