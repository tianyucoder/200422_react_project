import { reqLogin, reqLogout } from "@/api/acl/login";
import { LOGIN_SUCCESS, REMOVE_TOKEN } from "../constants/login";

/**
 * 登陆
 */
export const loginSuccessSync = tokenObj => {
	return {
		type: LOGIN_SUCCESS,
		data: tokenObj //{token:xxxxxx}
	}
};

/* 
	关于异步action：
			1.一般在其内部都会调用同步action
			2.组件中通过connect方法的传递后调用异步action是没有返回值的	
			3.若想在组件中通过connect方法的传递后调用异步action，有返回值，那么就要
				让dispatch函数有返回值
	特别注意：如果我们想得到异步action的返回值，就要层层return传递出去
*/
export const login = (username, password) => {
  return dispatch => {
		return reqLogin(username, password).then(tokenObj => {
			dispatch(loginSuccessSync(tokenObj));
			return tokenObj.token
		});
  };
};

/**
 * 删除token
 */
export const removeToken = () => ({
  type: REMOVE_TOKEN
});

/**
 * 登出
 */
export const logout = () => {
  return dispatch => {
    return reqLogout().then(() => {
      dispatch(removeToken());
    });
  };
};
