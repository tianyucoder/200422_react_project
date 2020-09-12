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
1. 如何让表格的某行数据可展开
			(1).第一种办法：expandedRowRender适用于展开自身没来得及显示的属性，不适用于发请求。
						expandedRowRender:(item)=>{
							console.log('展开自身没展示出来',item);
							return item.gmtCreate
						}
			(2).第二种办法：借助数据自身的children属性
2. 给展开按钮加回调：
						第一种设置方式：使用onExpand
								写法：
										expandable={{
											onExpand:(expanded,recod)=>{此处写业务逻辑}
										}}
								优势：好判断是否展开
								劣势：无法重置展开的状态，需要很复杂的手动维护展开项id

						第一种设置方式：使用expandedRowKeys
								写法：
										expandable={{
											expandedRowKeys:(expandedIds)=>{此处写业务逻辑}
										}}
								优势：自动维护展开项id
								劣势：需要手动判断展开还是收缩(写法不难)
3. 页码切换后，清空展开项:用到Table的expandedRowKeys属性
4. 分页器的使用：
		pagination={{
			pageSize,//页大小
			total,//数据总数,
			current,//当前页码
			showSizeChanger:true,//展示快速跳转框
			showQuickJumper:true,
			pageSizeOptions:['1','2','3','4','5','8','10','50'],//页大小备选项
			onChange:(page)=>{this.getNo1SubjectPagination(page)},//页码改变的回调
			onShowSizeChange:(_,pageSize)=>{//页大小改变的回调
				this.getNo1SubjectPagination(1,pageSize)
			} 
		}}

## day03任务
1. 编辑分类
			(1).在Tbale组件的列配置中，render与dataIndex的配合,获取当前分类信息,存入状态
			(2).更新后，不要刷新当前页面，而是自己遍历更新数据(体验好)，用到了一个递归查找：
				//封装更新数据的方法
				const handleData = arr =>{
					return arr.map((subject)=>{
						if(subject._id === editId){
							subject.title = editTitle
						}else{
							//如果某一级分类有children，继续去children里找
							if(subject.children) handleData(subject.children)
						}
						return subject
					})
				}
2. 删除分类
			(1).用到了Modal.confirm组件
					confirm({
							title:'xxxxx, //主标题
							icon: <QuestionCircleOutlined />,//图标
							content: '删除后无法恢复，请谨慎操作！',//副标题
							okText:'确认',
							cancelText:'取消',
							onOk:async()=> {} //弹窗中确认按钮的回调
							onCancel() {} //弹窗中取消按钮的回调
						});
			(2).执行删除
							(1).删除后重新请求当前页的最新数据
							(2).注意分页器中current属性的使用————用来指定当前页码
							(3).每次点击页码按钮后，将当前页码维护进状态
							(4).若当前不是第一页，且只有一条数据，删除后要请求前一页数据
3. 添加新增分类路由：
	一、编码：
			1.定义好AddSubject组件:在src/pages/Edu/Subject/componnets/AddSubject/index.jsx 
			2.在：src\config\asyncComps.js文件中，引入上一步的路由组件，并暴露,代码如下：
					const AddSubjet = () => lazy(() => import("@/pages/Edu/Subject/components/AddSubject"));
					export default {
						....
						AddSubjet
					};
	二、配置：
				1.去系统中：权限管理 ==> 菜单管理 ==> 教育管理===>分类管理 点击后面的加号
				2.弹窗中输入：
						菜单名称：新增分类
						访问路径：/subject/add
						组件路径：AddSubject
						按钮权限：subject.add
				3.给按钮分配权限：
							去系统中：权限管理 ==> 角色管理 ==> admin后的小齿轮，勾选新增管理
4. 编写新增分类静态组件：
			1.使用：Card、Form组件
			2.Form组件：
					(1).每个表单项都是一个Item
					(2).每个Item都分为：label区、wrapper区，可分别用labelCol、wrapperCol去控制
					(3).每个Item都可以加校验规则，用rules属性，前提：Item必须有name，否则规则失效
					(4).Form组件中任何的输入域，都要用Form组件的initialValues去指定，不允许单独指定
			3.Select组件：
					(1).每个Option必须有value属性
					(2).Select组件中dropdownRender用于指定下拉框中额外的内容。
					(3).dropdownRender值为函数，会接到Select标签体内容。
