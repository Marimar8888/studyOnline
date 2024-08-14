import React, { Component } from 'react';
import axios from 'axios';
import { DropzoneComponent } from 'react-dropzone-component';

import "../../../node_modules/dropzone/dist/min/dropzone.min.css";
import "../../../node_modules/react-dropzone-component/styles/filepicker.css";


export default class CourseForm extends Component {
/*   constructor(props) {
    super(props);

    this.state = {
      title: "",
      content: "",
      price: "",
      discounted_price: "",
      professor: "",
      center: "",
      category: "Programación",
      image: "",
      editMode: false,
      apiUrl: "http://localhost:5000/courses",
      apiAction: "post"
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentConfig = this.componentConfig.bind(this);
    this.djsConfig = this.djsConfig.bind(this);
    this.handleImageDrop = this.handleThumbDrop.bind(this);
    this.deleteImage = this.deleteImage.bind(this);

    this.imgRef = React.createRef();
  }

  componentDidUpdate() {
    if (Object.keys(this.props.courseToEdit).length > 0) {
      const {
        id,
        title,
        content,
        price,
        discounted_price,
        professor,
        center,
        category,
        image
      } = this.props.courseToEdit;

      this.props.clearCourseToEdit();

      this.setState({
        id: courses_id,
        title: courses_title || "",
        content: courses_content || "",
        price: courses_price || "",
        discounted_price: courses_discounted_price || "",
        professor: courses_professor || "",
        center: courses_studycenter || "",
        category: courses_category || "Programación",
        editMode: true,
        apiUrl: `http://localhost:5000/course/${courses_id}`,
        apiAction: "patch",
        image: courses_image || ""
      });
    }
  }

  deleteImage() {
    axios
      .delete(
        `http://localhost:5000/course/${this.state.courses_id}?image_type=${imageType}`
      )
      .then(response => {
        if (response) {
          this.setState({
            [`${imageType}_url`]: ""
          });
          this.props.handleEditFormSubmission();
        }
      })
      .catch(error => {
        console.log("deleteImage error", error);
      });
  }

  handleImageDrop() {
    return {
      addedfile: file => this.setState({ image: file })
    };
  }

  djsConfig() {
    return {
      addRemoveLinks: true,
      maxFiles: 1
    };
  }

  componentConfig() {
    return {
      iconFiletypes: [".jpg", ".png"],
      showFiletypeIcon: true,
      postUrl: "https://httpbin.org/post"
    };
  }

  handleChange() {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {

    axios({
      method: this.state.apiAction,
      url: this.state.apiUrl,
      data: this.buildForm(),
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        console.log(response);
        if (this.state.editMode) {
          this.props.handleEditFormSubmission();
        } else {
          this.props.handleNewFormSubmission(response.data);
        }

        this.setState({
          title: "",
          content: "",
          price: "",
          discounted_price: "",
          professor: "",
          center: "",
          category: "Programación",
          image: "",
          editMode: false,
          apiUrl: "http://localhost:5000/courses",
          apiAction: "post"
        });

        if (this.imgRef.current) {
          this.imgRef.current.dropzone.removeAllFiles();
        }
      })
      .catch(error => {
        console.log("course form handleSubmit error", error);
      });

    event.preventDefault();
  }

  buildForm() {
    let formData = new FormData();

    formData.append("courses_title", this.state.title);
    formData.append("courses_content", this.state.content);
    formData.append("courses_price", this.state.price);
    formData.append("courses_discounted_price", this.state.discounted_price);
    formData.append("courses_professor_id", this.state.professor);
    formData.append("courses_studycenter_id", this.state.center);
    formData.append("courses_category_id", this.state.category);

    if (this.state.image) {
      formData.append("courses_image", this.state.image);
    }

    return formData;
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="course-form-wrapper">
        <div className="two-column">
          <input
            type="text"
            name="title"
            placeholder="Course title"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <select
            name="category"
            value={this.state.category}
            onChange={this.handleChange}
            className="select-element"
          >
            <option value="Social Media">Social Media</option>
            <option value="Website">Website</option>
            <option value="Education">Education</option>
            <option value="Tecnology">Tecnology</option>
          </select>
        </div>

        <div className="two-column">
        <input
            type="text"
            name="professor"
            placeholder="Course professor"
            value={this.state.professor}
            onChange={this.handleChange}
          />
        <input
            type="text"
            name="center"
            placeholder="Course center"
            value={this.state.professor}
            onChange={this.handleChange}
          />
        </div>

        <div className="two-column">
        <input
            type="number"
            name="price"
            placeholder="Course price"
            value={this.state.price}
            onChange={this.handleChange}
          />
        <input
            type="number"
            name="discounted_price"
            placeholder="Course discounted"
            value={this.state.discounted_price}
            onChange={this.handleChange}
          />
        </div>

        <div className="one-column">
          <textarea
            type="text"
            name="content"
            placeholder="Description"
            value={this.state.content}
            onChange={this.handleChange}
          />
        </div>

        <div className="image-uploaders">
          {this.state.thumb_image_url && this.state.editMode ? (
            <div className="portfolio-manager-image-wrapper">
              <img src={this.state.thumb_image_url} />

              <div className="image-removal-link">
                <a onClick={() => this.deleteImage("thumb_image")}>
                  Remove file
                </a>
              </div>
            </div>
          ) : (
            <DropzoneComponent
              ref={this.imgRef}
              config={this.componentConfig()}
              djsConfig={this.djsConfig()}
              eventHandlers={this.handleImgDrop()}
            >
              <div className="dz-message">Image</div>
            </DropzoneComponent>
          )}
        </div>

        <div>
          <button className="btn" type="submit">
            Save
          </button>
        </div>
      </form>
    );
  } */
}


