import React from 'react'
import axios from 'axios'

import '../style/auth.style.css'

export default class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username : '',
            password : ''
        };
        this.auth = this.auth.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onChangeUsername = this.onChangeUsername.bind(this)
    }

    onChangeUsername(e){
        this.setState({username : e.target.value});
    }

    onChangePassword(e){
        this.setState({password : e.target.value})
    }

    auth(e){
        e.preventDefault()
        const obj = {
            username : this.state.username,
            password : this.state.password
        }
        axios.post('http://localhost:8000/api/user/login',obj,{
            withCredentials:true
        })
        .then(res =>{
            
            if (res.data.data != null){
                
                if(res.data.data.role === 'admin'){
                    this.props.history.push({
                        pathname : '/admin/home'
                    })
                }else if(res.data.data.role ==='guest'){
                    this.props.history.push({
                        pathname : '/guest/home'
                    })
                }
            }else{
                alert('username or password is wrong')
            }
        })
        .catch(err =>{
            alert(err)

        })
    }

    render(){
        return(
            <div className="login-page row">
                <div className="info col-4">
                    <div className="info-body">
                        <div class="logo">
                            <h3>SIMPLE BLOG</h3>
                        </div>
                        <div className="description">
                            <h3 id="description">Why Our Blog?</h3>
                            <ul className="desc-list">
                                <li>
                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
                                </li>
                                <li>
                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
                                </li>
                                <li>
                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="auth-container col-8">
                    <div className="auth-body">
                        <div className="title">
                            <h2 id="title">Welcome.</h2>
                        </div>
                        <div className="auth-form">
                            <form id="authform" onSubmit={this.auth}>
                                <div className="username mt-5">
                                    <label>Username</label>
                                    <input className="input-auth" type="text" placeholder="Username"
                                    value={this.state.username}
                                    onChange={this.onChangeUsername}/>
                                </div>        
                                <div className="pass mt-3">
                                    <label>Password</label>
                                    <input className="input-auth" type="password" placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.onChangePassword}  />
                                </div>
                                <button type="submit" className="btn" id="submit-btn">Login</button> <span></span>
                            </form>
                            <div className="auth-footer">
                                <p>Not a member? <a href="/register">Sign Up</a></p>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}