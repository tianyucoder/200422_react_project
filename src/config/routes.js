//路由配置（仅是基本路由的配置，具体用户登录后能用哪些路由，是动态生成的）
import Login from "@/pages/Login";
import NotFound from "@/pages/404";

//常量路由(无需登录即可访问的组件)
export const constantRoutes = [
	{
		path: "/login",
		component: Login,
		title: "登录",
	},
	{ path: "*", component: NotFound },
];

//登录后 默认路由
export const defaultRoutes = [
	{
		path: "/",
		component: "Admin",
		icon: "home",
		name: "后台管理系统",
	},
];
