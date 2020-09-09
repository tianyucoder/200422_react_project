import request from "@/utils/request";

const BASE_URL = "/admin/edu/teacher";

export function reqGetTeacher(id) {
  return request({
    url: `${BASE_URL}/get/${id}`,
    method: "GET",
  });
}

export function reqGetAllTeacherList() {
  return request({
    url: `${BASE_URL}/list`,
    method: "GET",
  });
}

export function reqGetTeacherList({
  page,
  limit,
  name,
  level,
  gmtCreateBegin,
  gmtCreateEnd,
}) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: "GET",
    params: {
      name,
      level,
      gmtCreateBegin,
      gmtCreateEnd,
    },
  });
}

export function reqSearchTeacherList(key) {
  return request({
    url: `${BASE_URL}/name/${key}`,
    method: "GET",
  });
}

export function reqAddTeacher({ avatar, sort, name, level, intro, career }) {
  return request({
    url: `${BASE_URL}/save`,
    method: "POST",
    data: { avatar, sort, name, level, intro, career },
  });
}

export function reqUpdateTeacher({
  id,
  avatar,
  sort,
  name,
  level,
  intro,
  career,
}) {
  return request({
    url: `${BASE_URL}/update`,
    method: "PUT",
    data: { id, avatar, sort, name, level, intro, career },
  });
}

export function reqRemoveTeacher(id) {
  return request({
    url: `${BASE_URL}/remove/${id}`,
    method: "DELETE",
  });
}

export function reqBatchRemoveTeacher(idList) {
  return request({
    url: `${BASE_URL}/batchRemove`,
    method: "DELETE",
    data: { idList },
  });
}
