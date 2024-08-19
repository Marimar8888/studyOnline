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

  getCourseItems() {
    axios
      .get(`${API_URL}/courses`
      )
      .then(response => {
        this.setState({
          courseItems: [...response.data]
        });
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
