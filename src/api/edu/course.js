//所有课程相关的请求都在此发出
import request from "@/utils/request";

const BASE_URL = "/admin/edu/course";

export function reqAllCourse() {
  return request({
    url: `${BASE_URL}`,
    method: "GET",
  });
}
export function reqSearchCourse({page=1,limit=5,teacherId,subjectId,subjectParentId,title}) {
  return request({
		url: `${BASE_URL}/${page}/${limit}`,
		params:{teacherId,subjectId,subjectParentId,title},
    method: "GET",
  });
}
export function reqAllNo1Subject() {
  return request({
    url: `/admin/edu/subject`,
    method: "GET",
  });
}
export function reqAllNo2SubjectById(parentId) {
  return request({
    url: `/admin/edu/subject/get/${parentId}`,
    method: "GET",
  });
}
