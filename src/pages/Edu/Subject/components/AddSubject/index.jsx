import React, { Component } from 'react'
import {Card,Button,Form,Input,Select,Divider} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'
import {reqNo1SubjectPagination} from '@/api/edu/subject'
import './index.less'

const {Item} = Form
const {Option} = Select
export default class AddSubject extends Component {

	state = {
		no1SubjectInfo:{
			total:0,
			items:[]
		}
	}

	getAllNoaSubjectInfo = async()=>{
		const no1SubjectInfo = await reqNo1SubjectPagination(1,5)
		this.setState({no1SubjectInfo})
	}

	componentDidMount(){
		this.getAllNoaSubjectInfo()
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
					initialValues={{
						fenlei:''
					}}
				>
					<Item 
						label="分类名" 
						name="subject_name"
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
						name="fenlei"
						rules={[
							{required:true,message:'必须选择一个所属分类'}
						]}
					>
						<Select
							dropdownRender={(options)=>{
								return (
									<>
										{options}
										<Divider className="divider"/>
										<Button onClick={()=>alert(1)} type="link">加载更多~~</Button>
									</>
								) 
							}}
						>
							<Option value="">请选择分类</Option>
							{
								this.state.no1SubjectInfo.items.map((no1Sub)=>{
									return <Option key={no1Sub._id} value={no1Sub._id}>{no1Sub.title}</Option>
								})
							}
						</Select>
					</Item>
					<Item wrapperCol={{offset:2}}>
						<Button type="primary">确认</Button>
					</Item>
				</Form>
			</Card>
		)
	}
}
