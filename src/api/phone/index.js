//用于请求发送验证码
import request from "@/utils/request";

const BASE_URL = "/oauth/sign_in/digits";

export function reqVerifyCode(mobile) {
  return request({
    url: BASE_URL,
		method: "POST",
		data:{
			mobile
		}
  });
}
