//所有章节相关的请求都在此发出
import request from "@/utils/request";

const BASE_URL = "/admin/edu/chapter";

export function reqChapPagListByCourse(page,pageSize,courseId) {
  return request({
    url: `${BASE_URL}/${page}/${pageSize}`,
		method: "GET",
		params:{courseId}
  });
}
