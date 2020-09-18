import React, { Component } from "react";
import { Form, Input, Button,Row, Col, Tabs } from "antd";
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
import { login } from "@/redux/actions/login";
import "./index.less";

const { TabPane } = Tabs;
const { Item } = Form;

@withRouter
@connect(
	()=>({}),
	{login}
)
class LoginForm extends Component {

	state = {
		time:10, //倒计时的时间
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
			//获取用户输入的用户名、密码
			let {username,password} = this.refs.loginForm.getFieldsValue(['username','password'])
			let response = await this.props.login(username, password)
			this.gotoAdmin(response)
		}else{
			//获取手机号、验证码
			let {phone,verifyCode} = this.refs.loginForm.getFieldsValue(['phone','verifyCode'])
			console.log('您选择的是手机号登录',phone,verifyCode);
			// console.log(a);
			// let token = await this.props.login(username, password)
			// this.gotoAdmin(token)
		}
	}

	reqVerifyCode = ()=>{
		this.setState({canClick:false})
		this.timer = setInterval(()=>{
			let {time} = this.state
			time--
			if(time <= 0){
				this.setState({time:10,canClick:true})
				clearInterval(this.timer)
				return
			}
			this.setState({time})
		},1000)
	}

  render() {
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
							<Item name="phone">
								<Input placeholder="请输入手机号" prefix={<MobileOutlined />} className="form-icon" />
							</Item>
							<Item name="verifyCode">
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
