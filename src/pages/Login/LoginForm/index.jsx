import React, { Component } from "react";
import { Form, Input, Button,Row, Col, Tabs, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  GithubOutlined,
  WechatOutlined,
	QqOutlined,
	MobileOutlined,
	FieldNumberOutlined
} from "@ant-design/icons";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { login,loginSuccessSync } from "@/redux/actions/login";
import {reqVerifyCode} from '@/api/phone'
import {reqPhoneLogin} from '@/api/acl/login'
import "./index.less";

const { TabPane } = Tabs;
const { Item } = Form;

@withRouter
@connect(
	()=>({}),
	{login,loginSuccessSync}
)
class LoginForm extends Component {

	state = {
		time:60, //倒计时的时间
		canClick:true, //按钮是否可以点击
		loginType:'user'
	}

	gotoAdmin = (token)=>{
		localStorage.setItem("user_token", token);
		this.props.history.replace("/");
	}

	handleLogin = async()=>{
		const {loginType} = this.state
		if(loginType === 'user'){
			//校验数据
			await this.refs.loginForm.validateFields(['username','password'])
			//获取用户输入的用户名、密码
			let {username,password} = this.refs.loginForm.getFieldsValue(['username','password'])
			let response = await this.props.login(username, password)
			this.gotoAdmin(response)
		}else{
			//校验数据
			await this.refs.loginForm.validateFields(['phone','verifyCode'])
			//获取手机号、验证码
			let {phone,verifyCode} = this.refs.loginForm.getFieldsValue(['phone','verifyCode'])
			//发请求-用手机号登录
			const tokenObj = await reqPhoneLogin(phone,verifyCode)
			//存入token到redux
			this.props.loginSuccessSync(tokenObj)
			this.gotoAdmin(tokenObj.token)
		}
	}

	reqVerifyCode = async()=>{
		//校验手机号是否合法
		await this.refs.loginForm.validateFields(['phone'])
		//获取手机号
		const {phone} = this.refs.loginForm.getFieldsValue(['phone'])
		this.setState({canClick:false})
		this.timer = setInterval(()=>{
			let {time} = this.state
			time--
			if(time <= 0){
				this.setState({time:60,canClick:true})
				clearInterval(this.timer)
				return
			}
			this.setState({time})
		},1000)
		await reqVerifyCode(phone)
		message.success('验证码下发成功，请注意查收')
	}

  render() {
		const phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
    return (
      <>
        <Form
					ref="loginForm"
					name="normal_login"
					// onFinish={this.handleLogin}
					className="login-form"
        >
          <Tabs
						defaultActiveKey="user"
						onChange={(key)=>{this.setState({loginType:key})}}
            tabBarStyle={{ display: "flex", justifyContent: "center" }}
          >
            <TabPane tab="账户登录" key="user">
              <Item name="username" rules={[{required:true,message:'用户名必须填写'}]}>
                <Input
                  prefix={<UserOutlined className="form-icon" />}
                  placeholder="用户名：admin"
                />
              </Item>
              <Item name="password" rules={[{required:true,message:'密码必须填写'}]}>
                <Input
                  prefix={<LockOutlined className="form-icon" />}
                  type="password"
                  placeholder="密码: 111111"
                />
              </Item>
            </TabPane>
						<TabPane tab="手机登录" key="phone">
							<Item 
								name="phone" 
								rules={[
									{required:true,message:'手机号不能为空'},
									{pattern:phoneReg,message:'请输入一个合法的手机号'}
								]}>
								<Input placeholder="请输入手机号" prefix={<MobileOutlined />} className="form-icon" />
							</Item>
							<Item 
								name="verifyCode" 
								rules={[
									{required:true,message:'验证码不能为空'},
									{max:6,message:'验证码为6位'},
									{min:6,message:'验证码为6位'},
									{pattern:/^\d+$/,message:'验证码必须为数字'}
								]}>
								<Row justify="space-between">
									<Col lg={10}>
										<Input prefix={<FieldNumberOutlined />} className="form-icon"/>
									</Col>
									<Col lg={12}>
										{
											this.state.canClick ?
											<Button onClick={this.reqVerifyCode}>点击获取验证码</Button> :
											<Button disabled>点击获取验证码({this.state.time})</Button>
										}
									</Col>
								</Row>
							</Item>
						</TabPane>
					</Tabs>
          <Item>
            <Button
              type="primary"
							onClick={this.handleLogin}
							// htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </Item>
          <Item>
            <Row justify="space-between">
              <Col>
                <span>
                  第三方账号登录：
                  <GithubOutlined className="login-icon" />
                  <WechatOutlined className="login-icon" />
                  <QqOutlined className="login-icon" />
                </span>
              </Col>
            </Row>
          </Item>
        </Form>
      </>
    );
  }
}

export default LoginForm;
