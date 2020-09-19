import React, { Component } from 'react'
import {loginSuccessSync} from '@/redux/actions/login'
import {connect} from 'react-redux'

@connect(
	()=>({}),
	{loginSuccessSync}
)
class Oauth extends Component {

	componentDidMount(){
		//获取服务器传递过来的token
		const token = this.props.location.search.split('=')[1]
		//存入local中
		localStorage.setItem("user_token", token);
		//存入redux
		this.props.loginSuccessSync({token})
		//跳转
		this.props.history.replace("/");
	}

	render() {
		return (
			<div>
				授权成功！
			</div>
		)
	}
}
export default Oauth
