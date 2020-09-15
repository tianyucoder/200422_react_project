import React, { Component } from 'react'
import {Upload,message,Button} from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import {reqQiniuToken} from '@/api/upload'
import * as qiniu from 'qiniu-js'

const MAX_VIDEO_SIZE = 1024 * 1024 * 8 //视频大小限制在8MB
export default class MyUpload extends Component {

	//视频上传之前调用，用于对上传的文件进行一些详细的限制
	beforeUpload = (file)=>{
		// console.log('beforeUpload执行了',file);
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
	customRequest = async({file,onError,onProgress,onSuccess})=>{
		//创建一个上传的检测者
		const observer = {
			next({total}){
				//七牛在上传时，是“一点一点”上传，每次传完“一点”，都会调用next方法，传入一个对象
				//对象中包含着：文件总大小、已完成大小、完成百分比
				onProgress({percent:total.percent})
			},
			error(err){
				//如果七牛上传视频中遇到一些问题，导致失败了，就会调error，且传入错误对象
				onError()
				console.log('服务器记载了本次错误',err.message);
				message.error('上传失败，请联系管理员')
			},
			complete :(res)=>{
				//如果七牛最终上传成功，则调用complete
				onSuccess()
				// console.log('视频地址为：','http://qgoex93ob.hn-bkt.clouddn.com/'+res.key);
				this.props.onChange('http://qgoex93ob.hn-bkt.clouddn.com/'+res.key)
				message.success('上传成功！')
			}
		}
		//将视频交给七牛云
		const key = 'xiaopeiqi_'+file.uid //交给七牛云时文件的名字
		const {uploadToken:token} = await reqQiniuToken()//上传的凭证
		const observable = qiniu.upload(file, key, token)
		observable.subscribe(observer) // 上传开始,并开始监测上传的进度、结果
	}

	render() {
		return (
			<Upload 
				//action="https://www.baidu.com" //视频上传的地址---简单上传用此属性指定
				//method="post" //上传请求的方式----简单上传用此属性指定

				accept="video/mp4" //对上传文件进行类型的限制
				beforeUpload={this.beforeUpload}//视频上传之前调用
				customRequest={this.customRequest}//用于真正执行上传
			>
				<Button icon={<UploadOutlined />}>点击上传</Button>
			</Upload>
		)
	}
}
