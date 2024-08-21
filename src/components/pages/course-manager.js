import React, { Component } from 'react';
import axios from "axios";

import CourseSidebarList from '../course/course-sidebar-list';
import CourseForm from '../course/course-form';
import { API_URL } from '../../utils/constant';


export default class CourseManager extends Component {
  constructor() {
    super();

    this.state = {
      courseItems: [],
      courseToEdit: {}
    };

    this.clearCourseToEdit = this.clearCourseToEdit.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditFormSubmission = this.handleEditFormSubmission.bind(this);
    this.handleNewFormSubmission = this.handleNewFormSubmission.bind(this);
    this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this); 
  }

   fetchUserId(token) {
    return axios.get(`${API_URL}/get_user_id`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  fetchProfessorId(userId, token) {
    return axios.get(`${API_URL}/professor/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  fetchCourses(token) {
    return axios.get(`${API_URL}/courses`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  filterCoursesByProfessor(courses, professorId) {
    return courses.filter(course => course.professor === professorId);
  }

  getCourseItems() {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token not found');
      return;
    }

    this.fetchUserId(token)
      .then(response => {
        const userId = response.data.users_id;

        return this.fetchProfessorId(userId, token);
      })
      .then(response => {
        const professorId = response.data.professor.professor_id;

        return this.fetchCourses(token).then(coursesResponse => ({
          professorId,
          courses: coursesResponse.data
        }));
      })
      .then(({ professorId, courses }) => {

        const filteredCourses = this.filterCoursesByProfessor(courses, professorId);

        this.setState({
          courseItems: filteredCourses
        });
      })
      .catch(error => {
        console.error("Error in getCourseItems", error);
      });
  }

  clearCourseToEdit() {
    this.setState({
      courseToEdit: {}
    });
  }

  handleEditClick(courseItem) {
    this.setState({
      courseToEdit: courseItem
    });
  }

  handleDeleteClick(courseItem) {
    axios
      .delete(`${API_URL}/course/${courseItem.courses_id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        this.setState({
          courseItems: this.state.courseItems.filter(item => {
            return item.courses_id !== courseItem.courses_id;
          })
        });
      })
      .catch(error => {
        console.error("handleDeleteClick error", error);
      });
  }

  handleEditFormSubmission() {
    this.getCourseItems();
  }

  handleNewFormSubmission(courseItem) {
    this.setState({
      courseItems: [courseItem].concat(this.state.courseItems)
    });
  }

  handleFormSubmissionError(error) {
    console.log("handleFormSubmissionError error", error);
  }

  componentDidMount() {
    this.getCourseItems();
  }


  render() {
    return (
      <div className="course-manager-wrapper">
        <div className="left-column">
          <CourseForm
            handleNewFormSubmission={this.handleNewFormSubmission}
            handleEditFormSubmission={this.handleEditFormSubmission}
            handleFormSubmissionError={this.handleFormSubmissionError}
            clearCourseToEdit={this.clearCourseToEdit}
            courseToEdit={this.state.courseToEdit}
          />
        </div>

        <div className="right-column">
          <CourseSidebarList
            handleDeleteClick={this.handleDeleteClick}
            data={this.state.courseItems}
            handleEditClick={this.handleEditClick}
          />
        </div>
      </div>
    );
  }
}
