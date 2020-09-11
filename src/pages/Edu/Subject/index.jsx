import React, { Component } from 'react'
//引入antd的Card、Button组件
import {Card,Button,Table} from 'antd'
//引入图标
import {PlusCircleOutlined,FormOutlined,DeleteOutlined} from '@ant-design/icons'
//引入reqNo1SubjectPagination发送请求
import {reqNo1SubjectPagination} from '@/api/edu/subject'
//引入样式
import './index.less'

export default class Subject extends Component {

	state = {
		no1SubjectInfo:{ //存储一级分类数据
			items:[],//当前页的一级分类数据
			total:0 //数据总数
		},
		pageSize:3 //页大小
	}

	//根据：页码、页大小请求对应数据
	getNo1SubjectPagination = async(page,pageSize=this.state.pageSize)=>{
		const {items,total} = await reqNo1SubjectPagination(page,pageSize)
		this.setState({
			no1SubjectInfo:{items,total},
			pageSize
		})
	}

	componentDidMount (){
		//初始化第一页数据
		this.getNo1SubjectPagination(1)
	}

	render() {
		//从状态中获取所有一级分类数据
		const {no1SubjectInfo:{total,items},pageSize} = this.state
		//columns是表格的列配置（重要）
		const columns = [
			{
				title: '分类名', //列名
				dataIndex: 'title', //数据索引项
				key: '0',
				width:'80%'
			},
			{
				title: '操作',
				dataIndex: 'name',
				key: '1',
				align:'center',
				render:()=>(
					<>
						<Button className="left_btn" type="primary" icon={<FormOutlined/>}></Button>
						<Button type="danger" icon={<DeleteOutlined/>}></Button>
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
					dataSource={items} 
					columns={columns} 
					rowKey="_id" 
					expandable={{

						//如下配置适用于自身属性没来得及展示的这种情况，不适合发送网络请求
						/* expandedRowRender: record => { //展开某项的回调
							return <span>{record.gmtCreate}</span>
						}, 
						rowExpandable: () => true */
					}}
					pagination={{
						pageSize,//页大小
						total,//数据总数,
						showSizeChanger:true,
						showQuickJumper:true,
						pageSizeOptions:['3','5','8','10','50'],
						onChange:(page)=>{this.getNo1SubjectPagination(page)},//页码改变的回调
						onShowSizeChange:(_,pageSize)=>{this.getNo1SubjectPagination(1,pageSize)}
					}}
				/>
			</Card>
		)
	}
}
