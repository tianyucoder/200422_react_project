import React, { Component } from 'react'
import {connect} from 'react-redux'
import {loginSuccessSync} from '@/redux/actions/login'

@connect(
	()=>({}),
	{loginSuccessSync}
)
class Oauth extends Component {

	componentDidMount(){
		// 1.获取token --> 此时服务器已经获取到github用户数据，并注册了用户，返回token
		const token = this.props.location.search.split("=")[1];
		//2.存入local中
		localStorage.setItem("user_token", token);
		//3.存入redux中
		this.props.loginSuccessSync({token})
		//4.跳转页面
		this.props.history.replace('/')
	}

	render() {
		return (
			<div style={{fontSize:'30px'}}>
				授权登录中.....
			</div>
		)
	}
}
export default Oauth