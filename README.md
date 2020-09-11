## day01任务
1. 安装数据库、导入数据、启动服务器、启动项目
2. 项目文件结构分析
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
3. 在项目中添加一个菜单的流程：
			一、编码：
					1.在：src\pages\Edu建立文件夹：Subject\index.jsx
					2.在：src\config\asyncComps.js文件中，引入上一步的路由组件，并暴露,代码如下：
							const Subject = () => lazy(() => import("@/pages/Edu/Subject"));
							export default {
								....
								Subject
							};
			二、配置：
						1.去系统中：权限管理 ==> 菜单管理 ==> 教育管理后的加号
						2.输入：
								(1).菜单名称:分类管理
								(2).访问路径:/subject/list
								(3).组件路径:Subject
						3.给菜单分配权限：
									去系统中：权限管理 ==> 角色管理 ==> admin后的小齿轮，勾选分类管理
4. 编写分类管理静态组件
			1.使用Card和Table组件
			2.注意Table组件中render和dataIndex属性的配合使用
5. 展示一级分类列表真实数据
			1.理解：真(后端)分页、假(前端)分页
			2.antd中分页器组件的使用
			
## day02任务
1. 配置Table组件的展开
		(1).expandedRowRender适用于展开自身的额外项，不适用于发送网络请求
		(2).