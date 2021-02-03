import axios from 'axios';
import React from 'react';

import {Redirect} from 'react-router-dom'

import '../style/admin.home.style.css'

export default class AdminHome extends React.Component{
    constructor(props){
        super(props)
        
        this.state = {
            post : [],
            logged : true
        }
        this.postClick = this.postClick.bind(this)
        console.log(this.props)
    }

    componentDidMount(){

        axios.get('http://localhost:8000/api/post/userpost/'+ this.props.data.id)
        .then(res =>{
            console.log(res)
            if (res.status == 200){
                this.setState({
                    post : res.data.data,
                    postClick : false,
                    clickedPost : {}
                })
                
            }
        })
    }

    listPost(parent){
       
        if (parent.state.post.length != 0){
            
            return parent.state.post.map(function(obj){
                return (<ul class="list-unstyled">
                    <li class="post-section" onClick={() => parent.postClick(obj)}>
                        <div class="post-desc">
                        <div class="post-title">
                            {obj.title}
                        </div>
                        <div class="post-body">
                            {obj.body}
                        </div>
                        <div class="comment-count">
                            Comments: {obj.comment}
                        </div>
                        </div>
                    </li>
                    </ul>)
            })
        }else{
            return (<h4>You have no post yet...</h4>)
        }
    }

    postClick(obj){
        this.setState({
            postClick : true,
            clickedPost : obj
        })
        
    }

    logout(parent){
        axios('http://localhost:8000/api/logout',{
            withCredentials:true
        })
        .then(res=>{
            parent.props.history.push('/login');
        })
    }
    render(){
        if (!this.state.logged){
            return <Redirect to={{
                pathname:'/login',
                
            }}/>
        }else{
        if (this.state.postClick){
            return <Redirect to={{
                pathname:'/admin/post/',
                state: {data: this.props.data, post : this.state.clickedPost}
            }}/>
        }
        return (
            <div class="admin-home">
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" href="#">Simple Blog</a>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a class="nav-link">Home</a>
                        </li>
                        <li>
                            <a class="nav-link" onClick={() => this.logout(this)}>Logout</a>
                        </li>
                        </ul>
                    </div>
                </nav>
                <div class="admin-content">
                    <div class="row">
                        <div class="col-10">
                            <h2>Welcome, {this.props.data.name}</h2>
                        </div>
                        <div class="col-2">
                            <button type="submit" className="btn" id="cstm-comment"><a id="btn-create-post" href="/admin/createpost">Create Post</a></button> <span></span>
                        </div>
                    </div>
                    <div class="list-post">
                        <h3>Your Posts</h3>
                        <div class="content-post">
                            {this.listPost(this)}
                        </div>
                    </div>
                </div>
                <footer>@Copyright 2021 by Juan</footer>
            </div>
            
            
        )
    }
    }
}
