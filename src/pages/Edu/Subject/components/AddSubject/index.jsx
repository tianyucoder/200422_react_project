import React, { Component } from 'react'
import {Card,Button,Form,Input} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'

const {Item} = Form
export default class AddSubject extends Component {
	render() {
		return (
			<Card
				title={
					<div>
						<Button onClick={()=>this.props.history.goBack()} type="link" icon={<ArrowLeftOutlined/>}/>
						<span>新增分类</span>
					</div>
				}
			>
				<Form>
					<Item 
						label="分类名" 
						wrapperCol={{span:6}}
						name="subject_name"
						rules={[
							{required:true,message:"分类名不能为空"},
							{max:12,message:"分类名不能超过12位"},
							{min:2,message:"分类名不能少于2位"},
						]}
					>
						<Input placeholder="请输入分类名"/>
					</Item>
					<Item>2</Item>
					<Item>3</Item>
				</Form>
			</Card>
		)
	}
}
