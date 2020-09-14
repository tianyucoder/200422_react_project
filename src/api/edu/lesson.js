//所有课时相关的请求都在此发出
import request from "@/utils/request";

const BASE_URL = "/admin/edu/lesson";

export function reqAllLessonListByCourseId(chapterId) {
  return request({
    url: `${BASE_URL}/get/${chapterId}`,
    method: "GET",
  });
}
