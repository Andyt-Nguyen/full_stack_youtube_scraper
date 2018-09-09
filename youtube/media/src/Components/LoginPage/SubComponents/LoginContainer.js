import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

export default ({title, logo, theme, cta, onChangeUsername, onChangePassword, username, password, children, isLoading}) => (
    <div className="login_page_wrapper">
        {
            isLoading
            ? <LinearProgress color={'secondary'} />
            : ''

        }
        <div className="login_page_container card">
            {children}
        </div>
    </div>
)