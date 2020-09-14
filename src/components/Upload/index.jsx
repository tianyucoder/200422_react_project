import React, { Component } from 'react'
import {Upload,message,Button} from 'antd'
import { UploadOutlined } from '@ant-design/icons';

const MAX_VIDEO_SIZE = 1024 * 1024 * 8 //8MB
export default class MyUpload extends Component {

	//视频上传之前调用，用于对上传的文件进行一些详细的限制
	beforeUpload = (file)=>{
		console.log('beforeUpload执行了',file);
		return new Promise((resolve,reject)=>{
			if(file.size <= MAX_VIDEO_SIZE){
				resolve(file)
			}else{
				reject('视频大小超过8MB！')
				message.warning('视频大小不得超过8MB')
			}
		})
	}

	//用于编写自定义上传的逻辑
	customReques = ()=>{
		//此处要写一些代码，将视频交给七牛云
	}

	render() {
		return (
			<Upload 
				//action="https://www.baidu.com" //视频上传的地址---简单上传用此属性指定
				//method="post" //上传请求的方式----简单上传用此属性指定

				accept="video/mp4" //对上传文件进行类型的限制
				beforeUpload={this.beforeUpload}//视频上传之前调用
				customReques={this.customReques}//用于真正执行上传
			>
				<Button icon={<UploadOutlined />}>点击上传</Button>
			</Upload>
		)
	}
}
