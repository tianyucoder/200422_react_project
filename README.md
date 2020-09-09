## day01任务
	1.安装数据库、导入数据、启动服务器、启动项目
	2.项目文件结构分析
			jsconfig.json：vscode所特有的配置文件
			config-overrides.js：复写react脚手架配置
			api：定义接口请求的文件--按照功能点进行拆分的
			assets：公共资源文件(样式、图片)
			utils:公共js文件（工具js）
			components：可复用组件
			pages：路由组件
			config: 配置文件
				asyncComps.js懒加载 
				icon.js图标 
				route.js路由配置
				没有登录的话，只能访问login和404页面，其他页面由后台控制。
			layouts：整体布局模块，每个页面都会用到的固有布局，分为：私有的、公开的
			redux：redux状态管理