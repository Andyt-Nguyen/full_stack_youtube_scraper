import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { VideoAndContent, VideoSkeletonLoader } from '../../Common'
import { withRouter } from 'react-router-dom'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

class SimpleTabs extends React.Component {
  state = {
    value: 0,
    likedVideos: null,
    historyVideos: [],
    favoriteVideos: []
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
      const jwt = JSON.parse(localStorage.getItem('auth_token')).token
      const user_id = JSON.parse(localStorage.getItem('auth_token')).user_id
      fetch(`http://localhost:5000/api/users/${url}/${this.props.match.params.username}`)
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
          <TabContainer>
            <div className="flex_row_vods">
              <VideoAndContent
                container_style={{marginTop:20, marginRight:3}}
                videoId={'1'}
                img="https://placehold.it/300"
                views="123,123"
                lastUploaded="July 6, 2018"
                title="Fresh Pies"
                text_container={{margin:0}} 
                channel_name_style={{display:'none'}} />

                <VideoAndContent
                container_style={{marginTop:20, marginRight:3}}
                videoId={'1'}
                img="https://placehold.it/300"
                views="123,123"
                lastUploaded="July 6, 2018"
                title="Fresh Pies"
                text_container={{margin:0}} 
                channel_name_style={{display:'none'}} />

                <VideoAndContent
                container_style={{marginTop:20, marginRight:3}}
                videoId={'1'}
                img="https://placehold.it/300"
                views="123,123"
                lastUploaded="July 6, 2018"
                title="Fresh Pies"
                text_container={{margin:0}} 
                channel_name_style={{display:'none'}} />

                <VideoAndContent
                container_style={{marginTop:20, marginRight:3}}
                videoId={'1'}
                img="https://placehold.it/300"
                views="123,123"
                lastUploaded="July 6, 2018"
                title="Fresh Pies"
                text_container={{margin:0}} 
                channel_name_style={{display:'none'}} />

                <VideoAndContent
                container_style={{marginTop:20, marginRight:3}}
                videoId={'1'}
                img="https://placehold.it/300"
                views="123,123"
                lastUploaded="July 6, 2018"
                title="Fresh Pies"
                text_container={{margin:0}} 
                channel_name_style={{display:'none'}} />

                <VideoAndContent
                container_style={{marginTop:20, marginRight:3}}
                videoId={'1'}
                img="https://placehold.it/300"
                views="123,123"
                lastUploaded="July 6, 2018"
                title="Fresh Pies"
                text_container={{margin:0}} 
                channel_name_style={{display:'none'}} />

                <VideoAndContent
                container_style={{marginTop:20, marginRight:3}}
                videoId={'1'}
                img="https://placehold.it/300"
                views="123,123"
                lastUploaded="July 6, 2018"
                title="Fresh Pies"
                text_container={{margin:0}} 
                channel_name_style={{display:'none'}} />
            </div>
          </TabContainer>}


        {value === 1 &&
           <TabContainer>
             <div className="flex_row_vods">
              {this.getUserLikes()}
             </div>
           </TabContainer>}


        {value === 2 &&
           <TabContainer>
             <div className="flex_row_vods">
              {
                this.state.historyVideos == null
                ? this.renderSkeletonLoader()
                : this.renderHistoryVideos()
              }
             </div>
           </TabContainer>}
      </div>
    );
  }
}


export default withRouter(SimpleTabs);