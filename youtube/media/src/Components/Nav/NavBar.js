import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import logo from './images/youtubelogo.png'
import PopModule from './SubComponents/PopModule'
import { Icon } from '../Common'
import './styles/index.css'


const styles = {
    button: {
      background:'white',
      border: 'none',
      color: 'dodgerblue',
      textTransform: 'uppercase',
      padding: '0 10px',
      fontFamily: 'Roboto',
      width:'75px'

    },
  }


class NavBar extends Component {
    state = {
        showSearchInput: true
    }

    toggleSearchInput() {
        this.setState({showSearchInput:!this.state.showSearchInput})
    }

    render() {
        return (
            <div>
                <div style={{margin:'0 auto', boxShadow:"0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 2px 2px 0 rgba(0, 0, 0, 0.1)"}}>
                    <nav className="navStyle">
                        <div style={{display:'flex', alignItems: 'center'}}>
                            <i style={{marginRight: '10px'}} className="fas fa-bars"></i>
                            <Link to="/"><img src={logo} /></Link>
                        </div>

                        <div className="nav_input_wrapper">
                            <div className="nav_input_container">
                                <input className="nav_input" type="text" />
                                <button className="nav_search_btn"><Icon iconName={"fas fa-search"} /></button>
                            </div>
                        </div>
                  


        
                        <div className="nav_icon_container">
                            <Icon iconName={"fas fa-upload"} />
                            <Icon iconName={"fas fa-share"} />
                            <Icon iconName={"fas fa-bell"} />
                            <Link to="signin" style={{textDecoration:'none'}}>
                            <Button size="small" color="primary" className={this.props.classes.button}>
                                <h4>Sign In</h4>
                            </Button>
                                {/* <Icon iconName= {"fas fa-user-circle"} /> */}
                            </Link>
                        </div>



                    </nav>
                </div>
                <PopModule />
            </div>
        )
    }
}  

export default withStyles(styles)(NavBar)