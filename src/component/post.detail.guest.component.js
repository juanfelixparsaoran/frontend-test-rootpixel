import React from 'react'
import axios from 'axios'

import '../style/post.detail.style.css'
export default class PostDetailGuest extends React.Component{
    constructor(props){
        super(props)
        
        this.state = {
            comment : [],
            addcomment : ""
        }
        this.addComment = this.addComment.bind(this)
        this.onChangeComment = this.onChangeComment.bind(this)
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
        return parent.state.comment.map(function(obj){
            return(<ul class="list-unstyled"><li class="body-comment">{obj.body}</li></ul>)
        })
    }
    logout(parent){
        axios('http://localhost:8000/api/logout')
        .then(res=>{
            parent.props.history.push('/login');
        })
    }

    addComment(e) {
        e.preventDefault();
        
        const obj = {
            body : this.state.addcomment,
            user_id : this.props.location.state.data.id,
            post_id : this.props.location.state.post.id,

        }
        
        axios.post('http://localhost:8000/api/comment',obj,{
            withCredentials:true
        })
        .then(res =>{
            
            this.props.history.push({
                pathname : '/guest/home'
            })
        })
    }

    onChangeComment(e){
        this.setState({addcomment : e.target.value})
    }
    render(){
        return (
            <div class="post-detail">
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
                <div class="detail">
                    <div class="title">
                        {this.props.location.state.post.title}
                    </div>
                    <div class="body">
                        {this.props.location.state.post.body}
                    </div>
                    <div class="comment">
                        Comments :
                        {this.showComment(this)}
                    </div>
                    <div class="add-comment">
                        <textarea placeholder="Enter comment here..." form="addcomment" value={this.state.addcomment} onChange={this.onChangeComment}></textarea>
                        <form id="addcomment" onSubmit={this.addComment}>
                            <input type="hidden" value={this.props.location.state.post.id} onChange={this.onChangeId} />
                            <button type="submit" className="btn" id="cstm-comment">Send</button> <span></span>
                        </form>
                            
                    </div>
                </div>
            </div>
            
        )
    }
}