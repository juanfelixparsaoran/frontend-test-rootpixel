import axios from 'axios';
import React from 'react';

import {Redirect} from 'react-router-dom'

import '../style/admin.home.style.css'

export default class AdminHome extends React.Component{
    constructor(props){
        super(props)
        this.logout = this.logout.bind(this)
    }

    logout(){
        axios('http://localhost:8000/api/logout',{
            withCredentials:true
        })
        .then(res=>{
            this.props.history.push('/login');
        })
    }
    render(){
        
        return (
            <div class="navbar-common">
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" href="#">Simple Blog</a>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ml-auto">
                        <li class="nav-item active">
                            <a class="nav-link">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/admin/profile">Profile</a>
                        </li>
                        <li>
                            <a class="nav-link" onClick={this.logout}>Logout</a>
                        </li>
                        </ul>
                    </div>
                </nav>
            </div>
            
        )
    
    }
}
