import React, { Component } from 'react'
//引入antd的Card、Button组件
import {Card,Button,Table,Tooltip,Input} from 'antd'
//引入图标
import {PlusCircleOutlined,FormOutlined,DeleteOutlined} from '@ant-design/icons'
//引入reqNo1SubjectPagination发送请求
import {
	reqNo1SubjectPagination,
	reqAllNo2SubjectByNo1Id,
	reqUpdateSubject
} from '@/api/edu/subject'
//引入样式
import './index.less'

export default class Subject extends Component {

	state = {
		no1SubjectInfo:{ //存储一级分类数据
			items:[],//当前页的一级分类数据
			total:0 //数据总数
		},
		pageSize:3, //页大小
		expandedRowKeys:[], //展开了的一级分类id数组
		loading:false, //是否处于加载中
		editSubjectId:'',//当前编辑的分类id
		editSubjectTitle:''//当前编辑的分类titile
	}

	//根据：页码、页大小请求对应数据
	getNo1SubjectPagination = async(page,pageSize=this.state.pageSize)=>{
		//展示loading
		this.setState({loading:true})
		//发送请求获取数据
		let {items,total} = await reqNo1SubjectPagination(page,pageSize)
		//加工请求回来的一级分类数组，给每一项都加children属性，目的的是可以展开
		items = items.map(no1Subject => ({...no1Subject,children:[]}))
		//维护状态
		this.setState({
			no1SubjectInfo:{items,total}, //更新一级分类数据
			pageSize,//更新页大小
			expandedRowKeys:[],//清空之前展开过的分类
			loading:false //是否处于加载中
		})
	}

	//点击展开按钮的回调
	handleExpand = async(expandedIds)=>{
		//从状态中获取:展开的一级分类、所有一级分类数据
		const {expandedRowKeys,no1SubjectInfo} = this.state
		//如果是展开
		if(expandedRowKeys.length < expandedIds.length){
			//获取当前展开项的id
			const currentId = expandedIds.slice(-1)[0]
			//获取当前展开项
			const currentSubject = no1SubjectInfo.items.find(sub => sub._id === currentId)
			//如果当前项没有展开过
			if(currentSubject.children && !currentSubject.children.length){
				//请求数据
				const result = await reqAllNo2SubjectByNo1Id(currentId)
				//获取二级分类数组
				const {items} = result
				//给指定一级分类追加children数据
				const formatedNo1Items = no1SubjectInfo.items.map(no1Subject =>{
					//如果是当前展开的分类
					if(no1Subject._id === currentId){
						no1Subject.children = items
						if(!items.length) delete no1Subject.children
					}
					return no1Subject
				})
				//维护状态
				this.setState({
					//更新一级分类数据
					no1SubjectInfo:{...no1SubjectInfo,items:formatedNo1Items},
				})
			}
		}
		//维护好当前展开的id数组
		this.setState({expandedRowKeys:expandedIds})
	}

	//点击编辑按钮的回调
	handleEdit = ({_id,title})=>{
		return ()=>{
			this.setState({editSubjectId:_id,editSubjectTitle:title})
		}
	}

	//用户更改title的回调
	handleTitleChange = (event)=>{
		this.setState({editSubjectTitle:event.target.value})
	}

	//编辑状态下，确认按钮的回调
	updateSubject = async()=>{
		const {editSubjectId,editSubjectTitle} = this.state
		const result = await reqUpdateSubject(editSubjectId,editSubjectTitle)
		this.getNo1SubjectPagination(1)
		this.setState({editSubjectId:'',editSubjectTitle:''})
	}

	componentDidMount (){
		//初始化第一页数据
		this.getNo1SubjectPagination(1)
	}

	render() {
		//从状态中获取所有一级分类数据
		const {
			no1SubjectInfo:{total,items},
			pageSize,
			expandedRowKeys,
			loading,
			editSubjectId
		} = this.state
		//columns是表格的列配置（重要）
		const columns = [
			{
				title: '分类名', //列名
				// dataIndex: 'title', //数据索引项
				key: '0',
				width:'80%',
				render:(subject)=>(
					subject._id === editSubjectId ?
					<Input 
						onChange={this.handleTitleChange} 
						className="edit_input" 
						type="text" 
						defaultValue={subject.title}
					/>:subject.title
				)
			},
			{
				title: '操作',
				// dataIndex: 'title',
				key: '1',
				align:'center',
				render:(subject)=>(
					subject._id === editSubjectId ?
					<div className="edit_btn_group">
						<Button size="small" className="ok_btn" type="primary" onClick={this.updateSubject}>确定</Button>
						<Button size="small">取消</Button>
					</div>:
					<>
						<Tooltip title="编辑">
							<Button onClick={this.handleEdit(subject)}className="left_btn" type="primary" icon={<FormOutlined/>}></Button>
						</Tooltip>
						<Tooltip title="删除">
							<Button type="danger" icon={<DeleteOutlined/>}></Button>
						</Tooltip>	
					</>
				)
			},
			/* 
					1.render和dataIndex同时存在的时候，以render为主。
					2.render接收到的参数，由dataIndex控制,dataIndex若不写，则传递当前数据项所有内容
			*/
		];
		return (
			<Card 
				title={
					<Button type="primary" icon={<PlusCircleOutlined/>}>
						新增分类
					</Button>
				}
			>
				<Table 
					dataSource={items} //表格数据源
					columns={columns} //表格列配置
					rowKey="_id" //指定数据唯一属性
					loading={loading}
					expandable={{ //配置表格可展开项
						//onExpand:this.handleExpand, //展开的回调 ---- 传入：是否为展开、当前展开项
						onExpandedRowsChange:this.handleExpand,//展开的回调 --- 传入：处于展开状态的id数组
						expandedRowKeys, //告诉Table展开了哪些项
						
						//如下配置适用于自身属性没来得及展示的这种情况，不适合发送网络请求
						/* expandedRowRender: record => { //展开某项的回调
							return <span>{record.gmtCreate}</span>
						}, 
						rowExpandable: () => true //该项是否可以展开 */
					}}
					pagination={{
						pageSize,//页大小
						total,//数据总数,
						showSizeChanger:true,//展示快速跳转框
						pageSizeOptions:['3','5','8','10','50'],//页大小备选项
						onChange:(page)=>{this.getNo1SubjectPagination(page)},//页码改变的回调
						onShowSizeChange:(_,pageSize)=>{this.getNo1SubjectPagination(1,pageSize)} //页大小改变的回调
					}}
				/>
			</Card>
		)
	}
}
