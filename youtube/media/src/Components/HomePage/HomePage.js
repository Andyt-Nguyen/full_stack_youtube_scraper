import React, { Component } from 'react'
import NavBar from '../Nav/NavBar'
import Category from './SubComponents/Category';
import './css/style.css'
import VideoAndContent from './SubComponents/VideoAndContent';
import Slider from 'react-slick'
import VideoSlider from './SubComponents/VideoSlider';
import VideoSkeletonLoader from './SubComponents/VideoSkeletonLoader'
import Skeleton from 'react-skeleton-loader'

export default class HomePage extends Component {
    constructor() {
        super()
        this.state = {
            trendingSect: null,
            comedySect: null,
            gamingSect: null,
            moviesSect: null,
            sportsSect: null,
            newsSect: null
        }
    }

    callFrontPageApis(url,state) {
        try {
            fetch(`http://localhost:5000/api/frontpage/${url}`)
            .then( res => res.json())
            .then( data => {
                // Handle errors here
                console.log(data)
                data = data.slice(0,6)
                this.setState({[state]:data})
            })
        } catch(e) {
            return []
        }
        
    }

    getVideoSections() {
        this.callFrontPageApis('trending','trendingSect')
        this.callFrontPageApis('comedy','comedySect')
        this.callFrontPageApis('gaming','gamingSect')
        this.callFrontPageApis('movies','moviesSect')
        this.callFrontPageApis('sports','sportsSect')
        this.callFrontPageApis('news','newsSect')
    }

    renderSection(stateName) {
        const placeHolder = [1,2,3,4,5,6]
        const state = this.state
        if(state[stateName] === null) {
            return placeHolder.map( a => <VideoSkeletonLoader key={a} />)
        } else {
            return state[stateName].map( a => (
                <VideoAndContent 
                    key={a.videoIds}
                    videoId={a.videoIds}
                    title={a.title}
                    channelName={a.channelName}
                    lastUploaded={a.lastUploaded}
                    views={a.viewCount} 
                    img={a.thumbnail} />))
            }
        }
        

    componentDidMount() {
        this.getVideoSections()
    }

    
    render() {
        return (
            <React.Fragment>
                <NavBar />
            <div className="homepage_container">
                <VideoSlider categoryName="Trending">
                    {this.renderSection("trendingSect")}
                </VideoSlider>

                <VideoSlider categoryName="Gaming">
                    {this.renderSection("gamingSect")}
                </VideoSlider>

                <VideoSlider categoryName="Comedy">
                    {this.renderSection("comedySect")}
                </VideoSlider>

                <VideoSlider categoryName="News">
                    {this.renderSection("newsSect")}
                </VideoSlider>

                <VideoSlider categoryName="Movies">
                    {this.renderSection("moviesSect")}
                </VideoSlider>

                <VideoSlider categoryName="Sports">
                    {this.renderSection("sportsSect")}
                </VideoSlider>
            </div>
            </React.Fragment>
        )
    }
}