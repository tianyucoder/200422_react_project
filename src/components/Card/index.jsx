// 自己封装的Card组件
import React, { Component } from 'react'
import {Divider,Tooltip } from 'antd'
import {
	QuestionCircleOutlined,
} from '@ant-design/icons';
import './index.less'

export default class Card extends Component {

	render() {
		const {title,alert,content,footer} = this.props
		return (
			<div className='admin_card'>
				<header className="header">
					<div className="left">
						{title}
					</div>
					<div className="right">
					<Tooltip title={alert}>
						<QuestionCircleOutlined />
					</Tooltip>
					</div>
				</header>
				<section className="content">
					{content}
				</section>
				<Divider className="divider"/>
				<footer className="footer">
					{footer}
				</footer>
			</div>
		)
	}
}
