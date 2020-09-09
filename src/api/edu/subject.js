//所有分类相关的请求都在此发出
import request from "@/utils/request";

const BASE_URL = "/admin/edu/subject";

/**
 * @author tianyu
 */
export function reqAllNo1Subject() {
  return request({
    url: BASE_URL,
    method: "GET",
  });
}

/**
 * @author tianyu
 * @param {第几页} page 
 * @param {页大小} pageSize 
 */
export function reqNo1SubjectPagination(page,pageSize) {
  return request({
    url: `${BASE_URL}/${page}/${pageSize}`,
    method: "GET",
  });
}