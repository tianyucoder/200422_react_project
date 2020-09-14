import React, { Component } from 'react'
import {Card,Form,Select,Button} from 'antd'
import {reqAllCourse} from '@/api/edu/course'
import {reqChapPagListByCourse} from '@/api/edu/chapter'
import Pubsub from 'pubsub-js'
import './index.less'

const {Item} = Form
const {Option} = Select

export default class Search extends Component {

	state = {
		courseList:[] //存储课程列表，用于交给Select组件展示
	}

	//获取所有课程列表
	getAllCourse = async()=>{
		//请求所有课程列表
		const courseList = await reqAllCourse()
		//维护状态
		this.setState({courseList})
	}

	//表单提交的回调
	handleFinish = async(values)=>{
		//获取选择的课程id
		const {courseId} = values
		//根据课程id请求该课程下的章节数据
		const result = await reqChapPagListByCourse(1,5,courseId)
		//发布消息，通知List组件接收数据
		Pubsub.publish('chapter_list',result)
	}

	//重置表单的回调
	resetForm = ()=>{
		this.refs.form.resetFields();
	}

	componentDidMount(){
		//初始化课程列表
		this.getAllCourse()
	}

	render() {
		//状态中获取courseList
		const {courseList} = this.state
		return (
			<Card>
				<Form 
					ref="form"//给Form组件打标签，用于后期拿到Form实例对象去重置表单
					layout="inline" //内联表单
					initialValues={{courseId:''}} //表单中输入项的初始值
					onFinish={this.handleFinish} //表单提交的回调
				>
					<Item 
						label="选择课程" //输入框左侧的提示文字
						name="courseId" //Item的名字
						// wrapperCol={{span:4}}  //wrapperCol区域的宽度
						rules={[
							{required:true,message:"必须选择一个课程"}
						]}
					>
						<Select className="select_course">
							<Option value="">请选择课程</Option>
							{
								//遍历生成课程列表
								courseList.map((c)=>{
								return <Option key={c._id} value={c._id}>{c.title}</Option>
								})
							}
						</Select>
					</Item>
					<Item>
						<Button type="primary" htmlType="submit">搜索</Button>
					</Item>
					<Item>
						<Button onClick={this.resetForm}>重置</Button>
					</Item>
				</Form>
			</Card>
		)
	}
}
