import React, { Component } from 'react'
import {Card,Button,Table,Tooltip} from 'antd'
import {
	PlusOutlined,
	FullscreenExitOutlined,
	UploadOutlined,
	FormOutlined,
	DeleteOutlined
} from '@ant-design/icons';
import PubSub from 'pubsub-js'
import dayjs from 'dayjs'
import './index.less'

export default class CourseList extends Component {

	state = {
		courseList:[], //课程列表
		no1SubjectList:[], //一级分类数据
		teachers:[], //讲师数据
	}

	componentDidMount(){
		//订阅消息
		this.token = PubSub.subscribe('courseList',(_,data)=>{
			const {no1SubjectList,teachers,courseList} = data
			//遍历数据给每一个课程追加index属性，用于展示编号
			courseList.items = courseList.items.map((course,index)=>{
				course.index = index + 1
				return course
			})
			this.setState({
				courseList:courseList.items,
				no1SubjectList,
				teachers
			})
		});
	}

	componentWillUnmount(){
		//取消订阅
		PubSub.unsubscribe(this.token);
	}

	render() {

		const columns = [
			{
				title: "序号",
				dataIndex: "index",
				align:'center',
				width:100,
				key:"index"
			},
			{
				title: "课程标题",
				dataIndex: "title",
				align:'center',
				width:170,
				key:"index"
			},
			{
				title: "课程描述",
				dataIndex: "description",
				align:'center',
				width:200,
				key:"index"
			},
			{
				title: "课程图片",
				dataIndex: "cover",
				align:'center',
				key:"cover",
				width:140,
				render:(cover)=><img src={cover} className="course_img" alt=""/>
			},
			{
				title: "课程价格",
				dataIndex: "price",
				align:'center',
				width:120,
				key:"price",
				sorter: (a, b) => a.price - b.price,
				render:(price)=>'￥'+price
			},
			{
				title: "课程讲师",
				dataIndex: "teacherId",
				align:'center',
				width:200,
				key:"teacherId",
				render:(teacherId)=>{
					const result = this.state.teachers.find((t)=>{
						return t._id === teacherId
					})
					return result.name
				}
			},
			{
				title: "所属课程分类",
				dataIndex: "subjectParentId",
				align:'center',
				width:200,
				key:"subjectParentId",
				render:(id)=>{
					const result = this.state.no1SubjectList.find(s=> s._id === id)
					return result.title
				}
			},
			{
				title: "总课时",
				dataIndex: "lessonNum",
				align:'center',
				width:100,
				key:"lessonNum"
			},
			{
				title: "总阅读量",
				dataIndex: "viewCount",
				align:'center',
				width:100,
				key:"viewCount"
			},
			{
				title: "总购买量",
				dataIndex: "buyCount",
				align:'center',
				width:100,
				key:"buyCount"
			},
			{
				title: "最新修改时间",
				dataIndex: "gmtModified",
				align:'center',
				width:200,
				key:"gmtModified",
				render:time =>dayjs(time).format('YYYY年 MM月DD日 HH:mm:ss')
			},
			{
				title: "课程状态",
				dataIndex: "status",
				align:'center',
				width:200,
				key:"status"
			},
			{
				title: "版本号",
				dataIndex: "version",
				align:'center',
				width:200,
				key:"version"
			},
			{
				title: "操作",
				align:'center',
				width:200,
				fixed:'right',
				key:"action",
				render:()=>(
					<>
						<Tooltip placement="top" title="发布课程">
							<Button 
									type="primary" 
									className="edit_btn" 
									icon={<UploadOutlined />}
							>
							</Button>
						</Tooltip>
						<Tooltip placement="top" title="编辑课程">
							<Button 
									type="primary" 
									className="edit_btn" 
									icon={<FormOutlined />}
							>
							</Button>
						</Tooltip>
						<Tooltip placement="top" title="删除课程">
							<Button 
								type="danger" 
								icon={<DeleteOutlined />}
							></Button>
						</Tooltip>
					</>
				)
			},
		];

		return (
			<Card 
				title="课程列表"
				extra={
					<>
						<Button type="primary" icon={<PlusOutlined />}>新增课程</Button>		
						<Button 
							size="large"
							onClick={this.handleFullScreen}
							className="option_btn" 
							type="link" 
							icon={<FullscreenExitOutlined/>}
						></Button>
					</>
				}
			> 
				<Table
					rowKey="_id" //唯一标识
					columns={columns} //表格中列的配置
					dataSource={this.state.courseList}//表格的数据源(存储数据的数组)
					scroll={{x:1}}
				/>
			</Card>
		)
	}
}
