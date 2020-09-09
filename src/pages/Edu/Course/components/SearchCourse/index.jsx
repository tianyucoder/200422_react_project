import React, { Component } from 'react'
import {Card,Form,Input,Select,Button} from 'antd'
import {reqAllNo1Subject,reqAllNo2SubjectById} from '@/api/edu/course'
import {reqGetAllTeacherList} from '@/api/edu/teacher'
import {reqSearchCourse} from '@/api/edu/course'
import PubSub from 'pubsub-js'
import './index.less'

const {Item} = Form
const {Option} = Select

export default class SearchCourse extends Component {

	state = {
		no1SubjectList:[],
		teachers:[]
	};

	componentDidMount(){
		this.initData()
	}

	initData = async()=>{
		let [no1SubjectList,teachers] =  await Promise.all([
			reqAllNo1Subject(),
			reqGetAllTeacherList()
		])
		no1SubjectList = no1SubjectList.map((subject)=>{
			subject.isLeaf = false
			return subject
		})
		this.setState({no1SubjectList,teachers})
	}

	loadData = async selectedOptions => {
		console.log('loadData',selectedOptions);
		const targetOption = selectedOptions[selectedOptions.length - 1];
		targetOption.loading = true;
		let no2Subjects = await reqAllNo2SubjectById(targetOption._id)
		const {items} = no2Subjects 
		targetOption.loading = false;
		targetOption.children = [...items] 
		if(!items.length) targetOption.isLeaf = true
		this.setState({
			no1SubjectList: [...this.state.no1SubjectList],
		});
  };

	onFinish = async(values)=>{
		const {subject} = values
		if(subject){
			values.subjectParentId = subject[0]
			values.subjectId = subject[1]
		}
		let result = await reqSearchCourse(values)
		const {no1SubjectList,teachers} = this.state
		PubSub.publish('courseList',{no1SubjectList,teachers,courseList:result});
	}

	render() {
		return (
			<Card>
				<Form
					ref={(current)=>this.form = current}
					onFinish={this.onFinish}
					initialValues={{teacherId:''}}
					layout="inline"
				>
					<Item 
						name="title" 
						label="课程名"
					>
						<Input 
							placeholder="输入课程名" 
							className="search_title"
						/>
					</Item>
					<Item label="讲师" name="teacherId">
						<Select className="teacher_select">
							<Option key="-1" value="">请选择讲师</Option>
							{
								this.state.teachers.map((t)=><Option key={t._id} value={t._id}>{t.name}</Option>)
							}
						</Select>
					</Item>
					<Item>
						<Button type="primary" htmlType="submit">
							搜索
						</Button>
						<Button onClick={()=>this.form.resetFields()} className="search_reset">
							重置
						</Button>
					</Item>
				</Form>
			</Card>
		)
	}
}
