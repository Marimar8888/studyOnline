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
      studyCenters: [],
      categories: [],
      image: "",
      editMode: false,
      apiUrl: `${API_URL}/course`,
      apiAction: "post"

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentConfig = this.componentConfig.bind(this);
    this.djsConfig = this.djsConfig.bind(this);
    this.handleImageDrop = this.handleImageDrop.bind(this);
    this.deleteImage = this.deleteImage.bind(this);

    this.imgRef = React.createRef();
    
  }

   componentWillUnmount() {

    if (this.imgRef.current) {
      this.imgRef.current.dropzone.removeAllFiles();
    }
  } 

  componentDidMount() {
    this.setState({ isMounted: true });
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token no encontrado');
      return;
    }

    axios.get(`${API_URL}/get_user_id`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
          this.fetchCategories();
          const userId = response.data.users_id;
          return axios
            .get(`${API_URL}/professor/${userId}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
      })
      .then(response => {
          const professorData = response.data;
          this.setState({
            professors: [professorData.professor],
            studyCenters: professorData.study_centers,
            professorId: professorData.professor.professor_id
          });
      })
      .catch(error => {
        console.error('Error al obtener los datos de professor:', error);
      });
  }

  fetchCategories() {
    axios.get(`${API_URL}/categories`)
      .then(response => {
        if (this.state.isMounted) {
          const sortedCategories = response.data.sort((a, b) => a.categories_id - b.categories_id);
          this.setState({
            categories: sortedCategories
          });
        }
      })
      .catch(error => {
        console.error('Error al obtener las categorías:', error);
      });
  }

  componentDidUpdate(prevProps) {
    if (Object.keys(this.props.courseToEdit).length > 0 && this.props.courseToEdit !== prevProps.courseToEdit) {
      const {
        courses_id,
        courses_title,
        courses_content,
        courses_price,
        courses_discounted_price,
        professor,
        studycenter,
        category,
        courses_image
      } = this.props.courseToEdit;

      this.props.clearCourseToEdit();

      this.setState({
        id: courses_id,
        title: courses_title || "",
        content: courses_content || "",
        price: courses_price || "",
        discounted_price: courses_discounted_price || "",
        professorId: professor ? professor.professor_id : "",
        professorName: professor.professor_name || "",
        center: studycenter || "",
        category: category || "",
        editMode: true,
        apiUrl: `${API_URL}/course/${courses_id}`,
        apiAction: "patch",
        image: courses_image ? courses_image : null
      });

      if (this.imgRef.current) {
        this.imgRef.current.dropzone.removeAllFiles();
      }
    }
  }

  deleteImage() {
    const token = localStorage.getItem('token');
    axios
      .patch(
        `${API_URL}/course/${this.state.id}`,
        { courses_image: null },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      )
      .then(response => {
          console.log('deleteImagen', response);
          this.setState({
            image: null
          });
          this.props.handleEditFormSubmission();
       }
      )
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
      //acceptedFiles: 'image/*'
    };
  }

  componentConfig() {
    return {
      iconFiletypes: [".jpg", ".png"],
      showFiletypeIcon: true,
      postUrl: this.state.apiUrl
    };
  }

  buildForm() {
    let formData = new FormData();

    formData.append("courses_title", this.state.title);
    formData.append("courses_content", this.state.content);
    formData.append("courses_price", this.state.price);
    formData.append("courses_professor_id", this.state.professorId);
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
    console.log("FormData entries:", Array.from(formData.entries()));
    return formData;
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });

  }

  handleSubmit(event) {
    event.preventDefault();

    const formData = this.buildForm();
    console.log("Submitting form with data:", formData);
    axios({
      method: this.state.apiAction,
      url: this.state.apiUrl,
      data: formData,

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
          professorId: "",
          center: "",
          category: "",
          image: null,
          editMode: false,
          apiUrl: `${API_URL}/course`,
          apiAction: "post"
          // isMounted: false
        });

       // if (this.imgRef.current) {
          this.imgRef.current.dropzone.removeAllFiles();
       // }

      })
      .catch(error => {
        console.log("course form handleSubmit error", error);
      });
      event.preventDefault();

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
            value={this.state.category || ''}
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
            value={this.state.professorId || ''}
            onChange={this.handleChange}
            className="select-element"
          >
            <option value="">Select Professor</option>
            {this.state.professors.length > 0 ? (
              this.state.professors.map(professor => (
                <option key={professor.professor_id} value={professor.professor_id}>
                  {professor.professor_name}
                </option>
              ))
            ) : (
              <option value="">No Professors Available</option>
            )}
          </select>
          <select
            name="center"
            value={this.state.center || ''}
            onChange={this.handleChange}
            className="select-element"
          >
            <option value="">Select Center</option>
            {this.state.studyCenters.map(center => (
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
            <div className="course-manager-image-wrapper">
              <img src={this.state.image} />

              <div className="image-removal-link">
                <a onClick={() => this.deleteImage()}>
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


