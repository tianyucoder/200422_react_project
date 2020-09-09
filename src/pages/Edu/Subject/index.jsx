import React, { Component } from 'react'
//引入antd的Card、Button组件
import {Card,Button,Table} from 'antd'
//引入图标
import {PlusCircleOutlined,FormOutlined,DeleteOutlined} from '@ant-design/icons'
//引入reqAllSubject发送请求
import {reqAllSubject} from '@/api/edu/subject'
//引入样式
import './index.less'

export default class Subject extends Component {

	async componentDidMount (){
		const result = await reqAllSubject()
		console.log(result);
	}

	render() {
		//dataSource是表格的数据源，后期一定是由于服务器返回
		const dataSource = [
			{
				key: '1', //每条数据的唯一标识
				name: '测试分类一',
				phone:'123123123'
			},
			{
				key: '2',//每条数据的唯一标识
				name: '测试分类二',
				phone:'123123123'
			},
		];
		//columns是表格的列配置（重要）
		const columns = [
			{
				title: '分类名', //列名
				dataIndex: 'name', //数据索引项
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
				<Table dataSource={dataSource} columns={columns} />
			</Card>
		)
	}
}
