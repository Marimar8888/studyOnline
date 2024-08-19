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

    // this.clearCourseToEdit = this.clearCourseToEdit.bind(this);
    //this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditFormSubmission = this.handleEditFormSubmission.bind(this);
    this.handleNewFormSubmission = this.handleNewFormSubmission.bind(this);
    //this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this); 
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
    const url = `${API_URL}/course/${courseItem.courses_id}`;
    const headers = {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    };

    console.log("DELETE URL:", url);
    console.log("Headers:", headers);

    axios
        .delete(url, { headers })
        .then(response => {
            console.log("Delete successful:", response);
            this.setState({
                courseItems: this.state.courseItems.filter(item => {
                    return item.courses_id !== courseItem.courses_id;
                })
            });
        })
        .catch(error => {
            console.error("handleDeleteClick error", error);
            if (error.response) {
                console.error("Error response data:", error.response.data);
                console.error("Error response status:", error.response.status);
                console.error("Error response headers:", error.response.headers);
            } else if (error.request) {
                console.error("Error request:", error.request);
            } else {
                console.error("Error message:", error.message);
            }
        });
}

  /* handleDeleteClick(courseItem) {
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

        return response.data;
      })
      .catch(error => {
        console.log("handleDeleteClick error", error);
      });
  } */

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

  getCourseItems() {
    axios
      .get(`${API_URL}/courses`
      )
      .then(response => {
        this.setState({
          courseItems: [...response.data]
        });
        console.log(this.state.courseItems);
      })
      .catch(error => {
        console.log("error in getCourseItems", error);
      });
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
          //handleEditFormSubmission={this.handleEditFormSubmission}
          // handleFormSubmissionError={this.handleFormSubmissionError}
          //clearCourseToEdit={this.clearCourseToEdit}
          //courseToEdit={this.state.courseToEdit} 
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
