import React from 'react'
import axios from 'axios'

import '../style/auth.style.css'

export default class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username : '',
            password : '',
            confirmPassword : '',
            usernameAvailability:true,
            email:'',
            name:''
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this)
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangeName = this.onChangeName.bind(this)

    }

    onChangeUsername(e){
        
        const obj = {
            username : e.target.value
        }
        axios.post('http://localhost:8000/api/checkusername',obj)
        .then(res=>{
            
            if (res.data == 'Not Available'){
                this.setState({usernameAvailability : false})
            }else{
                this.setState({usernameAvailability : true})
            }
        })
        this.setState({username : e.target.value});
    }

    onChangePassword(e){
        this.setState({password : e.target.value})
    }
    onChangeConfirmPassword(e){
        this.setState({confirmPassword : e.target.value})
    }
    onChangeEmail(e){
        this.setState({email : e.target.value})
    }
    onChangeName(e){
        this.setState({name : e.target.value})
    }
    onSubmit(e){
        e.preventDefault();
        if ((this.state.password === this.state.confirmPassword) && this.state.usernameAvailability){
            const obj = {
                username : this.state.username,
                password : this.state.password,
                email : this.state.email,
                name : this.state.name,
                role : "guest"
            }
            axios.post('http://localhost:8000/api/user',obj,{
                withCredentials:true
            })
            .then(res =>{
                
                if (res.data.data !== null){
                    if(res.data.data.role === 'admin'){
                        this.props.history.push('/admin/home')
                    }else if(res.data.data.role ==='guest'){
                        this.props.history.push('/guest/home')
                    }
                }
            })
            .catch(err =>{
                alert('error login')
            })
        }else{
            alert('Check your username and password first')
        }
    }

    render(){
        
        var usernameMessage;
        if (this.state.username !== ''){
            if (this.state.usernameAvailability){
                usernameMessage = (<p>Available</p>)
            }else{
                usernameMessage = (<p>Not Available</p>)
            }
        }
        var passwordMessage;
        if ((this.state.password !== '') && (this.state.confirmPassword !== '')){
            if (this.state.password === this.state.confirmPassword){
                passwordMessage = (<p>Password match</p>);
            }else{
                passwordMessage = (<p>Password do not match</p>);
            }
        }
        return(
            <div className="register-page-container">
                <div className="info-class row">
                <div className="info col-4">
                    <div className="info-body">
                        <div class="logo">
                            <h4>Simple Blog</h4>
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
                        <div className="title mb-4">
                            <h2 id="title">Ready to see some post?<br/> Let’s create your account.</h2>
                        </div>
                        <div className="auth-form">
                            <form id="authform" onSubmit={this.onSubmit}>
                                <div className="username">
                                    <label>Username</label>
                                    <input className="input-auth" type="text" placeholder="Username"
                                    value={this.state.username}
                                    onChange={this.onChangeUsername}/>
                                </div>
                                <span id="username-span">{usernameMessage}</span>
                                <div className="email mt-2">
                                    <label>Email</label>
                                    <input className="input-auth" type="text" placeholder="Email"
                                    value={this.state.email}
                                    onChange={this.onChangeEmail}/>
                                </div>
                                <div className="name mt-2">
                                    <label>Name</label>
                                    <input className="input-auth" type="text" placeholder="Name"
                                    value={this.state.name}
                                    onChange={this.onChangeName}/>
                                </div>
                                <div className="password-form row mt-2 ">
                                    <div className="pass col-6">
                                        <label>Password</label>
                                        <input className="input-auth" type="password" placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.onChangePassword}  />
                                    </div>
                                    <div className="confirm-pass col-6">
                                        <label>Confirm Password</label>
                                        <input className="input-auth" type="password" placeholder="Confirm Password"
                                        value={this.state.confirmPassword} 
                                        onChange={this.onChangeConfirmPassword} />
                                    </div>
                                </div>
                                <span>
                                    {passwordMessage}
                                </span>
                                <div className="agreement mt-3">
                                    <input className="mr-2" type="checkbox"/>
                                    <label id="label-cek">I have read the Privacy Policy and agree to the Terms of Service.</label> 
                                </div>
                                <button type="submit" className="btn" id="submit-btn">Next</button>
                            </form>
                            <div className="auth-footer">
                                <p>Already a member? <a href="/login">Login</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}