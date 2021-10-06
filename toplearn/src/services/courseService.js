import http from "./httpService";
import config from "./config.json";

export const getCourses = () => {
  return http.get(`${config.localapi}/api/courses`);
};

export const getCourse = (courseId) => {
  return http.get(`${config.localapi}/api/course/${courseId}`);
};
