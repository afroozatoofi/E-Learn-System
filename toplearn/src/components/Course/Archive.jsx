import React, { useState } from "react";
import Pagination from "../common/Pagination";
import { useSelector } from "react-redux";
import { paginate } from "./../../utils/paginate";
import Course from "./Course";

const Archive = () => {
  const [perPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  const courses = useSelector((state) => state.courses);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const archiveCourses = paginate(courses, currentPage, perPage);

  return (
    <section className="term-categories">
      <div className="top-bar">
        <header>
          <h1>
            {" "}
            دوره های <span> برنامه نویسی وب </span>{" "}
          </h1>{" "}
          <span> {courses.length} دوره </span>
        </header>

        <div className="row">
          <div className="col-md-4 col-sm-12 col-xs-12 pull-right">
            <form action="" method="">
              <div className="input">
                <input type="text" name="" placeholder="موضوع مورد نظر ..." />
                <button>
                  <i className="zmdi zmdi-search"></i>
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-4 col-sm-6 col-xs-12 pull-right">
            <div className="switch-field available">
              <input
                id="available-filter-1"
                name="available"
                value="all"
                checked=""
                type="radio"
              />
              <label for="available-filter-1"> همه </label>
              <input
                id="available-filter-2"
                name="available"
                value="normal"
                type="radio"
              />
              <label for="available-filter-2"> خریدنی </label>
              <input
                id="available-filter-3"
                name="available"
                value="off"
                type="radio"
              />
              <label for="available-filter-3"> رایگان </label>
            </div>
          </div>
          <div className="col-md-4 col-sm-6 col-xs-12 pull-left">
            <div className="select-ddl">
              <select>
                <option> مرتب سازی </option>
                <option> قیمت </option>
                <option> مدرت زمان دوره </option>
                <option> تاریخ انتشار </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <aside className="col-lg-3 col-md-4 col-sm-12 col-xs-12">
          <section className="aside-section filter-by-category">
            <header>
              <h3> دسته بندی موضوعات </h3>
            </header>
            <div className="inner">
              <ul>
                <li>
                  <input type="checkbox" name="" id="cat-1" />
                  <label for="cat-1"> برنامه نویسی وب </label>
                </li>
                <li>
                  <input type="checkbox" name="" id="cat-2" />
                  <label for="cat-2"> برنامه نویسی موبایل </label>
                </li>
                <li>
                  <input type="checkbox" name="" id="cat-3" />
                  <label for="cat-3"> برنامه نویسی وب </label>
                </li>
                <li>
                  <input type="checkbox" name="" id="cat-4" />
                  <label for="cat-4"> برنامه نویسی موبایل </label>
                </li>
                <li>
                  <input type="checkbox" name="" id="cat-5" />
                  <label for="cat-5"> برنامه نویسی وب </label>
                </li>
                <li>
                  <input type="checkbox" name="" id="cat-6" />
                  <label for="cat-6"> برنامه نویسی موبایل </label>
                </li>
                <li>
                  <input type="checkbox" name="" id="cat-7" />
                  <label for="cat-7"> برنامه نویسی وب </label>
                </li>
                <li>
                  <input type="checkbox" name="" id="cat-8" />
                  <label for="cat-8"> برنامه نویسی موبایل </label>
                </li>
                <li>
                  <input type="checkbox" name="" id="cat-9" />
                  <label for="cat-9"> برنامه نویسی وب </label>
                </li>
                <li>
                  <input type="checkbox" name="" id="cat-10" />
                  <label for="cat-10"> برنامه نویسی موبایل </label>
                </li>
              </ul>
            </div>
          </section>
        </aside>

        <div className="col-lg-9 col-md-8 col-sm-12 col-xs-12">
          <section className="terms-items">
            <div className="row">
              <Course courses={archiveCourses} />
            </div>

            <Pagination
              totalCourse={courses.length}
              currentPage={currentPage}
              perPage={perPage}
              onPageChange={handlePageChange}
            />
          </section>
        </div>
      </div>
    </section>
  );
};

export default Archive;
