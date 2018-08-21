import React, { Component } from 'react'
import Category from './SubComponents/Category';
import './css/style.css'
import VideoAndContent from './SubComponents/VideoAndContent';
import Slider from 'react-slick'
import VideoSlider from './SubComponents/VideoSlider';

export default class HomePage extends Component {
    constructor() {
        super()
        this.state = {
            trendingSect: [],
            comedySect: [],
            gamingSect: []
        }
    }

    callFrontPageApis(url,state) {
        fetch(`http://localhost:5000/api/frontpage/${url}`)
            .then( res => res.json())
            .then( data => {
                data = data.slice(0,6)
                this.setState({[state]:data})
            })
    }

    getVideoSections() {
        this.callFrontPageApis('trending','trendingSect')
        this.callFrontPageApis('comedy','comedySect')
        this.callFrontPageApis('gaming','gamingSect')
    }

    renderSection(stateName) {
        const state = this.state
        return state[stateName].map( a => (
            <VideoAndContent 
                title={a.title}
                channelName={a.channelName}
                lastUploaded={a.lastUploaded}
                views={a.viewCount} 
                img={a.thumbnail}/>))
    }

    componentDidMount() {
        this.getVideoSections()
    }

    
    render() {
        return (
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
            </div>
        )
    }
}