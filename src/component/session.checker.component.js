import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios'

export default function withAuth(ComponentToProtect) {
    return class extends Component {
        constructor(props){
            super(props)
            this.state = {
                loading: true,
                redirect: false,
                user : {}
            }
        }

        componentDidMount(){
            axios.get('http://localhost:8000/api/checkauth',{
                withCredentials:true
            })
            .then(res=>{
                if (res.data != null){
                    this.setState({ loading: false, user : res.data.data});
                }else{
                    const error = new Error(res.error);
                    throw error;
                }
            })
            .catch(err => {
                console.error(err);
                this.setState({ loading: false, redirect: true });
            });
        }
        render(){
            const { loading, redirect } = this.state;
            if (loading){
                return null
            }

            if (redirect){
                return <Redirect to="/login"/>
            }

            return(
                <React.Fragment>
                    <ComponentToProtect {...this.props} data={this.state.user}/>
                </React.Fragment>
            )
        }
    }
}