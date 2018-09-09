import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { VideoAndContent, VideoSkeletonLoader } from '../../Common'
import { withRouter } from 'react-router-dom'

class SimpleTabs extends React.Component {
  state = {
    value: 0,
    likedVideos: null,
    historyVideos: null,
    favoriteVideos: null
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  getUserLikes() {
    let placeholder = [1,2,3,4,5,6]
    if(true) {
      return placeholder.map((a,i) => <VideoSkeletonLoader key={i} />)
    }
  }

  getUsersVideoCategs(url, state) {
    try {
      fetch(`/api/users/${url}/${this.props.match.params.username}`)
        .then( res => res.json())
        .then( data => this.setState({[state]:data.videos}))
    } catch(error) {
      console.log(error)
    }
  }

  renderHistoryVideos() {
    return this.state.historyVideos.map( a => (
      <VideoAndContent
          container_style={{marginTop:20, marginRight:3}}
          videoId={a.video_id}
          img={a.thumbnail}
          views={a.views}
          lastUploaded={a.lastUploaded}
          title={a.title}
          channelName={a.channel_name} />
    ))
  }

  renderCategVideos(stateName) {
    return this.state[stateName].map( a => (
      <VideoAndContent
          container_style={{marginTop:20, marginRight:3}}
          videoId={a.video_id}
          img={a.thumbnail}
          views={a.views}
          lastUploaded={a.lastUploaded}
          title={a.title}
          channelName={a.channel_name} />
    ))
  }


  renderSkeletonLoader() {
    let placeholder = [1,2,3,4,5,6]
    if(this.state.likedVideos === null) {
      return placeholder.map((a,i) => <VideoSkeletonLoader key={i} />)
    }
  }

  componentDidMount() {
    this.getUsersVideoCategs('getUserHistory', 'historyVideos')
    this.getUsersVideoCategs('getUserLikes', 'likedVideos')
    this.getUsersVideoCategs('getUserFavorites', 'favoriteVideos')
  }

  render() {
    const { value } = this.state;
    return (
      <div>
         <div style={{background:'#fafafa'}}>
            <Tabs tabItemContainerStyle={{background:'black'}} value={value} onChange={this.handleChange} centered>
              <Tab label="Favorites" />
              <Tab label="Likes" />
              <Tab label="History" />
            </Tabs>
         </div>


        {value === 0 && 
          <div className="flex_row_container">
            <div className="flex_row_vods">
              {
                this.state.favoriteVideos == null
                ? this.renderSkeletonLoader()
                : this.renderCategVideos("favoriteVideos")
              }
            </div>
          </div>}


        {value === 1 &&
           <div className="flex_row_container">
             <div className="flex_row_vods">
              {
                this.state.likedVideos == null
                ? this.renderSkeletonLoader()
                : this.renderCategVideos("likedVideos")
              }
             </div>
           </div>}


        {value === 2 &&
           <div className="flex_row_container">
             <div className="flex_row_vods">
              {
                this.state.historyVideos == null
                ? this.renderSkeletonLoader()
                : this.renderCategVideos("historyVideos")
              }
             </div>
           </div>}
      </div>
    );
  }
}


export default withRouter(SimpleTabs);