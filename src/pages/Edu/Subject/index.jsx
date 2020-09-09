import React, { Component } from 'react'
//引入antd的Card、Button组件
import {Card,Button,Table} from 'antd'
//引入图标
import {PlusCircleOutlined} from '@ant-design/icons'


export default class Subject extends Component {
	render() {
		//dataSource是表格的数据源，后期一定是由于服务器返回
		const dataSource = [
			{
				key: '1', //每条数据的唯一标识
				name: '胡彦斌',
				age: 32,
				address: '西湖区湖底公园1号',
				phone:'13634566543'
			},
			{
				key: '2',//每条数据的唯一标识
				name: '胡彦祖',
				age: 42,
				address: '西湖区湖底公园1号',
				phone:'13712344321'
			},
		];
		//columns是表格的列配置（重要）
		const columns = [
			{
				title: '姓名', //列名
				dataIndex: 'name', //数据索引项
				key: '0',
			},
			{
				title: '年龄',
				dataIndex: 'age',
				key: '1',
			},
			{
				title: '住址',
				dataIndex: 'address',
				key: '2',
			},
			{
				title: '手机号',
				dataIndex: 'phone',
				key: '3',
			},
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
