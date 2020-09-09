//所有分类相关的请求都在此发出
import request from "@/utils/request";

const BASE_URL = "/admin/edu/subject";

/**
 * @author tianyu
 * @param {*} a xxxx参数
 * @param {*} b yyyyy参数
 */
export function reqAllSubject(a,b) {
  return request({
    url: BASE_URL,
    method: "GET",
  });
}