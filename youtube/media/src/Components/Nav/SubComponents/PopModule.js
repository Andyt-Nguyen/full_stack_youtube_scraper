import React from 'react'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Avatar from '@material-ui/core/Avatar'
import ImageIcon from '@material-ui/icons/Image'
import AccountCircle from '@material-ui/icons/AccountCircle'

import PowerSettingsNewOutlined from '@material-ui/icons/PowerSettingsNewOutlined'

export default ({username,logout}) => (
    <div className="module">
        <Card>
            <List>
                <ListItem>
                    <Avatar>
                        <AccountCircle />
                    </Avatar>
                    <Link style={{textDecoration:'none', marginLeft:15}} to={`/user/${username}`}>
                        <ListItemText primary="Profile" />
                    </Link>
                </ListItem>
                
                <li>
                <Divider inset />
                </li>
                <ListItem>
                    <Avatar>
                        <PowerSettingsNewOutlined />
                    </Avatar>
                    <span style={{cursor:'pointer'}} onClick={logout}>
                        <ListItemText primary="Sign Out" />
                    </span>
                </ListItem>
            </List>
        </Card>
    </div>
)