import React, { Component } from 'react'
import SearchCourse from './components/SearchCourse'
import CourseList from './components/CourseList'

export default class Course extends Component {
	render() {
		return (
			<div>
				<SearchCourse/>
				<CourseList/>
			</div>
		)
	}
}
