import React, { Component } from 'react'
import {Card,Table,Button,Tooltip,Modal} from 'antd'
import {
	FullscreenOutlined,
	FormOutlined,
	DeleteOutlined,
	PlusOutlined,
	EyeOutlined,
	FullscreenExitOutlined
} from '@ant-design/icons';
import {reqAllLessonListByCourseId} from '@/api/edu/lesson'
import Pubsub from 'pubsub-js'
import {withRouter} from 'react-router-dom'
import { Player } from 'video-react';
import screenfull from 'screenfull'

import 'video-react/dist/video-react.css'
import './index.less'

class List extends Component {

	state = {
		chapterList:[], //存储某课程的章节列表
		visible:false, //控制弹窗是否展示
		lessonTitle:'', //当前正在预览课时的名称
		url:'',//视频预览地址
		isFull:false //标识是否全屏
	}

	//表格项展开的回调
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
	//弹窗中取消按钮的回调
	handleCancel = ()=>{
		console.log('你点击了取消按钮');
		this.setState({visible:false})
	}

	//展示视频预览框
	showModal = (data)=>{
		return ()=>this.setState({
			visible:true,
			lessonTitle:data.title,
			url:data.video
		})
	}

	//全屏、退出全屏按钮的回调
	switchFullScreen = ()=>{
		const {isFull} = this.state
		screenfull.toggle()
		this.setState({isFull:!isFull})
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

	componentWillUnmount(){
		//组件卸载前，取消订阅
		Pubsub.unsubscribe(this.msg_id)
	}

	render() {
		const {lessonTitle,visible,url,isFull} = this.state
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
				// dataIndex:'free',
				align:'center',
				render:(data)=> 'free' in data ? data.free ? '是' :'否' : ''
			},
			{
				title:'视频',
				// dataIndex:'video'
				render:(data)=> 'video' in data ? <Button onClick={this.showModal(data)} icon={<EyeOutlined />}/> : ''
			},
			{
				title:'操作',
				render:(data)=>(
					<>
						{
							'free' in data ? null:
							<Tooltip title="新增课时">
								<Button 
									onClick={()=>this.props.history.push('/edu/chapter/addlesson',{id:data._id})} 
									type="primary" 
									className="mar_right_btn" 
									icon={<PlusOutlined />}
								/>
							</Tooltip>
						}
						<Tooltip title="编辑">
							<Button type="primary" className="mar_right_btn" icon={<FormOutlined/>}/>
						</Tooltip>
						<Tooltip title="删除">
							<Button type="danger" icon={<DeleteOutlined/>}/>
						</Tooltip>
					</>
				)
			},
		]
		return (
			<>
				{/* 章节列表 */}
				<Card
					title="章节列表"
					extra={
						<>
							<Button type="primary" className="mar_right_btn">新增章节</Button>
							<Button type="danger">批量删除</Button>
							<Button 
								size="large"
								 onClick={this.switchFullScreen} 
								 className="link_btn" 
								 icon={isFull ? <FullscreenExitOutlined /> :<FullscreenOutlined/>}
							/>
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
				{/* 预览课时弹窗 */}
				<Modal
					title={lessonTitle} //弹窗的标题
					visible={visible} //弹窗是否展示
					// onOk={this.handleOk} //确定按钮的回调
					onCancel={this.handleCancel} //取消按钮的回调
					footer={null} //不展示底部按钮
					destroyOnClose //关闭弹窗后销毁子元素
				>
					<Player>
						<source src={url} />
					</Player>
				</Modal>
			</>
	)
	}
}
export default withRouter(List)
