import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../Nav/NavBar'
import VideoAndContent from './SubComponents/VideoAndContent'
import SkeletonLoader from './SubComponents/SkeletonLoader'
import './styles/index.css'

export default class SearchPage extends Component {
    state = {
        videos: null
    }

    getSearchedVideo() {
        const { query } = this.props.match.params;
        fetch(`api/query/result?search_query=${query}`)
            .then( res => res.json())
            .then( data => this.setState({videos:data}))
    }


    renderSearchedVideo() {
        const placeHolder = [1,2,3,4,5,6]
        try {
            if(this.state.videos === null) {
                return placeHolder.map(a => <SkeletonLoader />)
            } else {
                return this.state.videos.map( a => (
                    <Link style={{textDecoration:'none'}} to={`/watch_vod/${a.videoIds}`}>
                    <VideoAndContent
                        key={a.videosIds}
                        videoId={a.videoIds} 
                        img={a.thumbnail}
                        title={a.title}
                        views={a.viewCount} 
                        date={a.lastUploaded}
                        description={a.description} />
                    </Link>
                ))
            }
        } catch(e) {
            console.log(e)
        }
    }

    componentDidMount() {
        this.getSearchedVideo()
    }
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <div className="search_page_wrapper">
                   {this.renderSearchedVideo()}
                </div>
            </React.Fragment>
        )
    }
}