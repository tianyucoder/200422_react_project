import React, { Component } from "react";
import { Form, Input, Button, Row, Col, Tabs } from "antd";
import {
  UserOutlined,
  LockOutlined,
  GithubOutlined,
  WechatOutlined,
  QqOutlined,
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

	gotoAdmin = (token)=>{
		localStorage.setItem("user_token", token);
		this.props.history.replace("/");
	}

	handleLogin = async()=>{
		let {username,password} = this.refs.loginForm.getFieldsValue()
		let response = await this.props.login(username, password)
		this.gotoAdmin(response)
	}

  render() {
    return (
      <>
        <Form
					ref="loginForm"
          name="normal_login"
          className="login-form"
        >
          <Tabs
						onChange={key=>this.setState({loginType:key})}
            defaultActiveKey="user"
            tabBarStyle={{ display: "flex", justifyContent: "center" }}
          >
            <TabPane tab="账户登录" key="user">
              <Item name="username" rules={[{required:true,message:'用户名必须填写'}]}>
                <Input
                  prefix={<UserOutlined className="form-icon" />}
                  placeholder="用户名：admin"
                />
              </Item>
              <Item name="password" rules={[{required:true,message:'用户名必须填写'}]}>
                <Input
                  prefix={<LockOutlined className="form-icon" />}
                  type="password"
                  placeholder="密码: 111111"
                />
              </Item>
            </TabPane>
						{/* <TabPane tab="手机号登录" key="phone">
							<Item name="phone">
                <Input
                  prefix={<MobileOutlined className="form-icon" />}
                  placeholder="手机号"
                />
              </Item>
              <Row justify="space-between">
                <Col span={13}>
									<Item name="verify">
                    <Input
                      prefix={<MailOutlined className="form-icon" />}
                      placeholder="验证码"
                    />
                  </Item>
                </Col>
                <Col span={10}>
									<Button onClick={this.getVerifyCode} className="verify-btn">获取验证码</Button>
                </Col>
              </Row>
            </TabPane> */}
					</Tabs>
          <Item>
            <Button
              type="primary"
							onClick={this.handleLogin}
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
