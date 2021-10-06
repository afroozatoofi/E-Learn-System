import React from "react";
import { Switch, Route } from "react-router-dom";

import Course from "../components/Course/Course";
import MainLayout from "../components/Layouts/MainLayout";
import Login from "../components/Login/Login";
import Register from "./../components/Register/Register";
import Archive from "./../components/Course/Archive";
import SingleCourse from "./../components/Course/SingleCourse";
import UserProfile from "./../components/Profile/UserProfile";
import { useSelector } from "react-redux";
import { paginate } from "./../utils/paginate";

const Toplearn = () => {
  const courses = useSelector((state) => state.courses);
  const indexCourses = paginate(courses, 1, 8);
  return (
    <MainLayout>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/archive" component={Archive} />
        <Route path="/course/:id" component={SingleCourse} />
        <Route path="/user-profile" component={UserProfile} />
        <Route
          path="/"
          exact
          render={() => <Course courses={indexCourses} />}
        />
      </Switch>
    </MainLayout>
  );
};

export default Toplearn;
