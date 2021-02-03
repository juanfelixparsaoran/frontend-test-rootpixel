import axios from 'axios';
import React from 'react';

import {Redirect} from 'react-router-dom'

import '../style/guest.home.style.css'

export default class GuestHome extends React.Component{
    constructor(props){
        super(props)
        
        this.state = {
            post : [],
        }
        this.postClick = this.postClick.bind(this)
    }

    componentDidMount(){

        axios.get('http://localhost:8000/api/post/',{
            withCredentials:true
        })
        .then(res =>{
            console.log(res.data)
            if (res.status == 200){
                this.setState({
                    post : res.data,
                    postClick : false,
                    clickedPost : {}
                })
            }else{
                console.log('asda')
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
            return (<h4>There's no post yet...</h4>)
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
        if (this.state.postClick){
            return <Redirect to={{
                pathname:'/guest/post/',
                state: {data: this.props.data, post : this.state.clickedPost}
            }}/>
        }
        return (
            <div class="guest-home">
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" href="/guest/home">Simple Blog</a>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ml-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="/guest/home">Home</a>
                        </li>
                        
                        <li>
                            <a class="nav-link" onClick={() => this.logout(this)}>Logout</a>
                        </li>
                        </ul>
                    </div>
                </nav>
                <div class="guest-content">
                    <h2>Welcome, {this.props.data.name}</h2>
                    <div class="list-post">
                        
                        <div class="content-post">
                            {this.listPost(this)}
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}
