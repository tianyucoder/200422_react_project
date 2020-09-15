import React, { Component } from 'react'
import {Upload,Button,message} from 'antd'
import {reqQiniuToken} from '@/api/upload'
import * as qiniu from 'qiniu-js'

export default class TestUpload extends Component {

	beforeUpload = (file)=>{
		return new Promise((resolve,reject)=>{
			if(file.size <= 1024 * 1024 * 10){
				resolve(file)
			}else{
				reject('视频大小超过10MB！')
				message.warning('视频大小不得超过10MB')
			}
		})
	}

	customRequest = async({file})=>{
		const key = '佩奇'+Date.now()
		const {uploadToken:token} = await reqQiniuToken()

		//指定上传的核心属性
		const observable = qiniu.upload(file, key, token)
		 //触发上传
		observable.subscribe()
	}

	render() {
		return (
			<Upload
				beforeUpload={this.beforeUpload}
				customRequest={this.customRequest}
			>
				<Button>点我上传一个文件</Button>
			</Upload>
		)
	}
}
