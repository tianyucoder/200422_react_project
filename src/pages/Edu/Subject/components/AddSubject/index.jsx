import React, { Component } from 'react'
import {Card,Button,Form,Input,Select,Divider, message} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'
import {reqNo1SubjectPagination,reqAddSubject} from '@/api/edu/subject'
import './index.less'

const {Item} = Form
const {Option} = Select
let page = 1
export default class AddSubject extends Component {

	state = {
		no1SubjectInfo:{
			total:0,
			items:[]
		},
	}

	//根据页码、页大小获取一级分类数据
	getAllNo1SubjectInfo = async(page)=>{
		//获取原状态中的数据
		const {no1SubjectInfo} = this.state
		const {items} = no1SubjectInfo
		//请求新数据
		const result = await reqNo1SubjectPagination(page,5)
		//更新状态
		this.setState({
			no1SubjectInfo:{
				items:[...items,...result.items],
				total:result.total
			}
		})
	}

	//加载更多按钮的回调
	loadMore = ()=>{
		page++
		this.getAllNo1SubjectInfo(page)
	}

	//表单提交且输入项合法后的回调
	handleFinish = async(values)=>{
		await reqAddSubject(values)
		message.success('新增分类成功！')
		this.props.history.goBack()
	}

	componentDidMount(){
		this.getAllNo1SubjectInfo(page)
	}

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
				<Form
					wrapperCol={{span:6}}
					labelCol={{span:2}}
					onFinish={this.handleFinish} //1.点击了触发表单提交的按钮 2.表单输入项合法
					initialValues={{
						parentId:''
					}}
				>
					<Item 
						label="分类名" 
						name="title"
						rules={[
							{required:true,message:"分类名不能为空"},
							{max:12,message:"分类名不能超过12位"},
							{min:2,message:"分类名不能少于2位"},
						]}
					>
						<Input placeholder="请输入分类名"/>
					</Item>
					<Item 
						label="所属分类"
						name="parentId"
						rules={[
							{required:true,message:'必须选择一个所属分类'}
						]}
					>
						<Select
							dropdownRender={(options)=>{
								const {no1SubjectInfo} = this.state
								return (
									<>
										{options}
										<Divider className="divider"/>
										{
											no1SubjectInfo.total === no1SubjectInfo.items.length ?
											<Button type="link" disabled>没有更多数据了</Button>:
											<Button onClick={this.loadMore} type="link">加载更多~~</Button>
										}
									</>
								) 
							}}
						>
							<Option value="">请选择分类</Option>
							<Option value="0" className="first_subject">一级分类</Option>
							{
								this.state.no1SubjectInfo.items.map((no1Sub)=>{
									return <Option key={no1Sub._id} value={no1Sub._id}>{no1Sub.title}</Option>
								})
							}
						</Select>
					</Item>
					<Item wrapperCol={{offset:2}}>
						<Button type="primary" htmlType="submit">确认</Button>
					</Item>
				</Form>
			</Card>
		)
	}
}
