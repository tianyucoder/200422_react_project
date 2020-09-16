//所有的路由组件，都在这里引入，随后暴露
import { lazy } from "react";

const Admin = () => lazy(() => import("@/pages/Admin"));
const User = () => lazy(() => import("@/pages/Acl/User"));
const AddOrUpdateUser = () => lazy(() => import("@/pages/Acl/User/components/AddOrUpdateUser"));
const AssignUser = () => lazy(() => import("@/pages/Acl/User/components/AssignUser"));
const Role = () => lazy(() => import("@/pages/Acl/Role"));
const Permission = () => lazy(() => import("@/pages/Acl/Permission"));
const AssignRole = () => lazy(() => import("@/pages/Acl/Role/components/AssignRole"));
const AddOrUpdateRole = () => lazy(() => import("@/pages/Acl/Role/components/AddOrUpdateRole"));
const Course = () => lazy(() => import("@/pages/Edu/Course"));
const Settings = () => lazy(() => import("@/pages/User/Settings"));
const Center = () => lazy(() => import("@/pages/User/Center"));
const Subject = () => lazy(() => import("@/pages/Edu/Subject"));
const AddSubject = () => lazy(() => import("@/pages/Edu/Subject/components/AddSubject"));
const Chapter = () => lazy(() => import("@/pages/Edu/Chapter"));
const AddLesson = () => lazy(() => import("@/pages/Edu/Chapter/components/AddLesson"));
const TestUpload = () => lazy(() => import("@/pages/Edu/TestUpload"));
const TestEcharts = () => lazy(() => import("@/pages/Edu/TestEcharts"));

export default {
  Admin,
  User,
  AddOrUpdateUser,
  AssignUser,
  Role,
  Permission,
  AssignRole,
  AddOrUpdateRole,
  Course,
  Settings,
	Center,
	Subject,
	AddSubject,
	Chapter,
	AddLesson,
	TestUpload,
	TestEcharts
};
