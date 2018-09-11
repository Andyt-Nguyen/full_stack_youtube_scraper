import React from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import '../styles/loginpage.css'
export default ({
        title, 
        logo, 
        theme, 
        cta, 
        onChangeUsername, 
        onChangePassword, 
        username, 
        password, 
        animation, 
        isSign, 
        switchView,
        labelUsername,
        labelPassword,
        isUsername,
        isPassword,
        usernameErrorMsg,
        passwordErrorMsg }) => (
    <div className={`center_children ${animation}`}>
        <img className="logo_style" src={logo}  />
        <h2 style={{marginBottom:15, marginTop: 18}}>{ title }</h2>
        <p style={{fontSize:16, marginBottom:40}}>To continue to iceCremè</p>

        <div className="email_pass_container">
            <MuiThemeProvider theme={theme}>

                <FormControl error={ isUsername ? true : ''} aria-describedby="name-error-text">
                    <InputLabel htmlFor="name-error">{labelUsername}</InputLabel>
                    <Input onChange={ onChangeUsername } id="name-error" value={username} />
                    { isUsername ? <FormHelperText id="name-error-text">{usernameErrorMsg}</FormHelperText> : '' }
                </FormControl>

                    <div className="marginText"/>


                <FormControl error={ isPassword ? true : ''} aria-describedby="name-error-text">
                    <InputLabel htmlFor="name-error">{labelPassword}</InputLabel>
                    <Input type="password" onChange={ onChangePassword } id="name-error" value={password} />
                    { isPassword ? <FormHelperText id="name-error-text">{passwordErrorMsg}</FormHelperText> : '' }
                </FormControl>

            </MuiThemeProvider>
        </div>
        
        <div className="btn_container">
                <button onClick={() => cta()} className="btn">Submit</button>
        </div>
        <p onClick={() => switchView()} style={{cursor:'pointer', textAlign:'center', color:'dodgerblue'}}>
            {
                isSign
                ? "Dont't have an account? Sign up"
                : "Already have an account? Sign in"
            }
                    
        </p>   
    </div>
)