import React, { Component } from 'react';
import axios from 'axios';
import { DropzoneComponent } from 'react-dropzone-component';

import "../../../node_modules/dropzone/dist/min/dropzone.min.css";
import "../../../node_modules/react-dropzone-component/styles/filepicker.css";

import { API_URL } from '../../utils/constant';


export default class CourseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      content: "",
      price: "",
      discounted_price: "",
      professor: "",
      center: "",
      category: "",
      professors: [],
      centers: [],
      categories: [],
      image: "",
      editMode: false,
      apiUrl: `${API_URL}/course`,
      apiAction: "post"
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentConfig = this.componentConfig.bind(this);
    this.djsConfig = this.djsConfig.bind(this);
    this.handleImageDrop = this.handleImageDrop.bind(this);
    this.deleteImage = this.deleteImage.bind(this);

    this.imgRef = React.createRef();
  }

  componentDidMount() {
    axios.get(`${API_URL}/categories`)
      .then(response => {
        this.setState({
          categories: response.data
        });
      })
      .catch(error => {
        console.log('Error fetchin categories:', error);
      });

    axios
      .get(`${API_URL}/professors`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        this.setState({
          professors: response.data
        });
      })
      .catch(error => {
        console.log('Error fetchin professors:', 'error');
      });

    axios
      .get(`${API_URL}/studycenters`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        this.setState({
          centers: response.data
        });
      })
      .catch(error => {
        console.error('Error al hacer la solicitud:', error);
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.courseToEdit && Object.keys(this.props.courseToEdit).length > 0) {
      const {
        courses_id,
        courses_title,
        courses_content,
        courses_price,
        courses_discounted_price,
        courses_professor_id,
        courses_studycenter_ud,
        courses_category_id,
        courses_image
      } = this.props.courseToEdit;

      if (prevProps.courseToEdit !== this.props.courseToEdit) {
        this.setState({
          id: courses_id,
          title: courses_title || "",
          content: courses_content || "",
          price: courses_price || "",
          discounted_price: courses_discounted_price || "",
          professor: courses_professor_id || "",
          center: courses_studycenter_ud || "",
          category: courses_category_id || "",
          editMode: true,
          apiUrl: `${API_URL}/course/${courses_id}`,
          apiAction: "patch",
          image: courses_image || ""
        });

        if (typeof this.props.clearCourseToEdit === 'function') {
          this.props.clearCourseToEdit();
        }
      }
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
        maxFiles: 1,
        acceptedFiles: 'image/*',
        autoProcessQueue: false
      };
    }

    componentConfig() {
      return {
        iconFiletypes: [".jpg", ".png"],
        showFiletypeIcon: true,
        postUrl: this.state.apiUrl
      };
    }

    handleChange(event) {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    handleSubmit(event) {
      event.preventDefault();
      axios({
        method: this.state.apiAction,
        url: this.state.apiUrl,
        data: this.buildForm(),
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
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
            category: "",
            image: null,
            editMode: false,
            apiUrl: `${API_URL}/course`,
            apiAction: "post"
          });

          if (this.imgRef.current) {
            this.imgRef.current.dropzone.removeAllFiles();
          }
        })
        .catch(error => {
          console.log("course form handleSubmit error", error);
        });

    }

    buildForm() {
      let formData = new FormData();

      formData.append("courses_title", this.state.title);
      formData.append("courses_content", this.state.content);
      formData.append("courses_price", this.state.price);
      formData.append("courses_professor_id", this.state.professor);
      formData.append("courses_category_id", this.state.category);

      if (this.state.discounted_price) {
        formData.append("courses_discounted_price", this.state.discounted_price);
      }

      if (this.state.center) {
        formData.append("courses_studycenter_id", this.state.center);
      }

      if (this.state.image && this.state.image instanceof File) {
        formData.append("file", this.state.image);
      }

      return formData;
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit} className="course-form-wrapper">
          <div className="two-column">
            <input
              className='inputForm'
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
              <option value="">Select Category</option>
              {this.state.categories.map(category => (
                <option key={category.categories_id} value={category.categories_id}>
                  {category.categories_name}
                </option>
              ))}
            </select>
          </div>

          <div className="two-column">
            <select
              name="professor"
              value={this.state.professor}
              onChange={this.handleChange}
              className="select-element"
            >
              <option value="">Select Professor</option>
              {this.state.professors.map(professor => (
                <option key={professor.professors_id} value={professor.professors_id}>
                  {professor.professors_name}
                </option>
              ))}
            </select>
            <select
              name="center"
              value={this.state.center}
              onChange={this.handleChange}
              className="select-element"
            >
              <option value="">Select Center</option>
              {this.state.centers.map(center => (
                <option key={center.studyCenters_id} value={center.studyCenters_id}>
                  {center.studyCenters_name}
                </option>
              ))}
            </select>
          </div>

          <div className="two-column">
            <input
              className='inputForm'
              type="number"
              name="price"
              placeholder="Course price"
              value={this.state.price}
              onChange={this.handleChange}
            />
            <input
              className='inputForm'
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
            {this.state.image && this.state.editMode ? (
              <div className="portfolio-manager-image-wrapper">
                <img src={this.state.image} />

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
                eventHandlers={this.handleImageDrop()}
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
    }
  }


