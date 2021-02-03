import React from 'react'
import axios from 'axios'

import '../style/post.detail.style.css'
export default class CreatePost extends React.Component{
    constructor(props){
        super(props)
        console.log(this.props)
        this.state = {
            title : '',
            body : ''
        }
        this.onChangeTitle = this.onChangeTitle.bind(this)
        this.onChangeBody = this.onChangeBody.bind(this)
        this.createPost = this.createPost.bind(this)
    }

    onChangeTitle(e){
        this.setState({title : e.target.value})
    }
    onChangeBody(e){
        this.setState({body : e.target.value})
    }

    createPost(e){
        e.preventDefault()
        const obj = {
            title : this.state.title,
            body : this.state.body,
            user_id : this.props.data.id
        }
        console.log(obj)
        axios.post('http://localhost:8000/api/post',obj,{
            withCredentials:true
        })
        .then(res=>{
            console.log(res.data)
            this.props.history.push({
                pathname : '/admin/home'
            })
        })
    }

    logout(parent){
        axios('http://localhost:8000/api/logout')
        .then(res=>{
            parent.props.history.push('/login');
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
                <div class="create-post">
                    <h2>Create Post</h2>
                    
                    <h5>Title</h5>
                    <textarea form="createpost" value={this.state.title} onChange={this.onChangeTitle} placeholder="Insert title here..."></textarea>
                    <h5>Body</h5>
                    <textarea id="body-post" form="createpost" value={this.state.body} onChange={this.onChangeBody} placeholder="Insert body here..."></textarea>
                    <form id="createpost" onSubmit={this.createPost}>
                        <button type="submit" className="btn" id="cstm-comment">Submit</button> <span></span>
                    </form>
                </div>
            </div>
            
        )
    }
}