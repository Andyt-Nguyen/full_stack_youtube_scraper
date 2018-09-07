import React, { Component } from 'react'
import NavBar from '../Nav/NavBar'
import VideoAndContent from './SubComponents/VideoAndContent'
import './styles/index.css'

export default class SearchPage extends Component {
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <div className="search_page_wrapper">
                   <VideoAndContent />
                   <VideoAndContent />
                   <VideoAndContent />
                   <VideoAndContent />
                   <VideoAndContent />
                   <VideoAndContent />
                </div>
            </React.Fragment>
        )
    }
}