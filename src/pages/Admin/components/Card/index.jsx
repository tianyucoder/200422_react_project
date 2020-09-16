import React, { Component } from 'react'
import './index.less'

export default class Card extends Component {
	render() {
		const {left,right,content,footer} = this.props
		return (
			<div className="card_container">
				<header className="header">
					<div className="left">{left}</div>
					<div className="right">{right}</div>
				</header>
				<section className="content">
					{content}
				</section>
				<footer className="footer">
					{footer}
				</footer>
			</div>
		)
	}
}
