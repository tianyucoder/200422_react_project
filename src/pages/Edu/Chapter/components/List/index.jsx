import React, { Component } from 'react'
import {Card,Table,Button} from 'antd'
import {
	FullscreenOutlined,
	FormOutlined,
	DeleteOutlined,
	PlusOutlined
} from '@ant-design/icons';
import {reqAllLessonListByCourseId} from '@/api/edu/lesson'
import Pubsub from 'pubsub-js'
import './index.less'

export default class List extends Component {

	state = {
		chapterList:[] //存储某课程的章节列表
	}
	
	componentDidMount(){
		//组件挂在完毕，订阅消息，用于接收Search组件的搜索结果
		this.msg_id = Pubsub.subscribe('chapter_list',(_,data)=>{
			console.log('搜索回来的章节数据',data.items);
			//获取结果后，存储到自身状态，供Table组件读取，展示
			const items = data.items.map(chapter => ({...chapter,children:[]}))
			this.setState({chapterList:items})
		})
	}

	handleExpand = async(isExpanded,record)=>{
		if(isExpanded){
			// console.log('发请求，获取该章节下的课时数据',record);
			const lessonList = await reqAllLessonListByCourseId(record._id)
			console.log('请求回来的课时数据',lessonList);
			const chapterList = this.state.chapterList.map((chapter)=>{
				if(chapter._id === record._id){
					chapter.children = lessonList
				}
				return chapter
			})
			this.setState({chapterList})
		}
	}

	componentWillUnmount(){
		//组件卸载前，取消订阅
		Pubsub.unsubscribe(this.msg_id)
	}

	render() {
		//从状态中获取chapterList
		const {chapterList} = this.state
		//表格的列配置(重要)
		const columns = [
			{
				title:'章节名称',
				dataIndex:'title'
			},
			{
				title:'是否免费',
			},
			{
				title:'视频',
			},
			{
				title:'操作',
				render:(data)=>(
					<>
						{
							'free' in data ? null:
							<Button type="primary" className="mar_right_btn" icon={<PlusOutlined />}/>
						}
						<Button type="primary" className="mar_right_btn" icon={<FormOutlined/>}/>
						<Button type="danger" icon={<DeleteOutlined/>}/>
					</>
				)
			},
		]
		return (
			<Card
				title="章节列表"
				extra={
					<>
						<Button type="primary" className="mar_right_btn">新增章节</Button>
						<Button type="danger">批量删除</Button>
						<Button type="text" className="link_btn" icon={<FullscreenOutlined/>}/>
					</>
				}
			>
				<Table 
					dataSource={chapterList} 
					columns={columns} 
					rowKey="_id"
					expandable={{
						onExpand:this.handleExpand
					}}
				/>
			</Card>
		)
	}
}
