import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CourseSidebarList = props => {

    if (!props.data || props.data.length === 0) {
      return <div>No courses found.</div>;
    }
    const courseList = props.data.map(courseItem => {

    return (
    <div key={courseItem.courses_id} className="course-item">
        <div className="course-img">
          {/* <img src={courseItem.courses_image} /> */}

        </div>

        <div className="text-content">
        <div className="title">{courseItem.courses_title}</div>

          <div className="actions">
            <a
              className="action-icon"
              onClick={() => props.handleEditClick(courseItem)}
            >
              <FontAwesomeIcon icon="edit" />
            </a>

            <a
              className="action-icon"
              onClick={() => props.handleDeleteClick(courseItem)}
            >
              <FontAwesomeIcon icon="trash" />
            </a>
          </div>
        </div>
      </div>
        );
    });
    return <div className="course-sidebar-list-wrapper">{courseList}</div>;
};
export default CourseSidebarList;
