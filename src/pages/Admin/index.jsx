import React, { Component } from 'react'
import Card from './components/Card'
import {Row,Col} from 'antd'

export default class Admin extends Component {
	render() {
		return (
			<Row gutter={10}>
				<Col xs={24} sm={12} md={12} lg={6} xl={6}>
					<Card left="123" right="456" content="789" footer="890"/>
				</Col>
				<Col xs={24} sm={12} md={12} lg={6} xl={6}>
					<Card left="123" right="456" content="789" footer="890"/>
				</Col>
				<Col xs={24} sm={12} md={12} lg={6} xl={6}>
					<Card left="123" right="456" content="789" footer="890"/>
				</Col>
				<Col xs={24} sm={12} md={12} lg={6} xl={6}>
					<Card left="123" right="456" content="789" footer="890"/>
				</Col>
			</Row>
		)
	}
}
