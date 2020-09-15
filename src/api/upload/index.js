//用于请求七牛云授权的token
import request from "@/utils/request";

const BASE_URL = "/uploadtoken";

export function reqQiniuToken() {
  return request({
    url: BASE_URL,
		method: "GET",
  });
}
