import React from 'react'
import axios from 'axios'

import '../style/post.detail.style.css'
export default class PostDetail extends React.Component{
    constructor(props){
        super(props)
        
        this.state = {
            comment : []
        }
        this.deletePost = this.deletePost.bind(this)
    }

    componentDidMount(){
        axios('http://localhost:8000/api/comment/postcomment/'+ this.props.location.state.post.id)
        .then(res=>{
            this.setState({
                comment : res.data.data
            })
        })
    }

    showComment(parent){
        if (parent.state.comment.length != 0){
            return parent.state.comment.map(function(obj){
                return(<ul class="list-unstyled"><li class="body-comment">{obj.body}</li></ul>)
            })
        }else{
            return (<h5>There's no comment yet..</h5>)
        }
    }
    logout(parent){
        axios('http://localhost:8000/api/logout')
        .then(res=>{
            parent.props.history.push('/login');
        })
    }
    deletePost(){
        axios.delete('http://localhost:8000/api/post/'+this.props.location.state.post.id)
        .then(res=>{
            this.props.history.push('/admin/home');
        })
    }
    render(){
        return (
            <div class="post-detail">
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" href="/admin/home">Simple Blog</a>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ml-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="/admin/home">Home</a>
                        </li>
                        
                        <li>
                            <a class="nav-link" onClick={() => this.logout(this)}>Logout</a>
                        </li>
                        </ul>
                    </div>
                </nav>
                <div class="detail">
                    <div class="row">
                    <div class="title col-10">
                        {this.props.location.state.post.title}
                    </div>
                    <div class="delete col-2">
                    <button type="button" class="btn btn-danger" onClick={this.deletePost}>Delete</button>
                    </div>
                    </div>
                    <div class="body">
                        {this.props.location.state.post.body}
                    </div>
                    <div class="comment">
                        Comments :
                        {this.showComment(this)}
                    </div>
                </div>
            </div>
            
        )
    }
}