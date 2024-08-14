import React, { Component } from 'react';
import axios from 'axios';


export default class CourseDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courseItem: {}
    };
  }

  componentDidMount() {
    this.getCourseItem();
  }

  getCourseItem() {
    // axios.get(`https://alonsomarimar.devcamp.space/portfolio/portfolio_items/${this.props.match.params.slug}`
    axios.get(`http://localhost:5000/course/courses_id`
    )
      .then(response => {
        console.log("respo", response);

        this.setState({
          courseItem: response.data
        });
      })
      .catch(error => {
        console.log("getCourseItem error", error)
      });

  }

  render() {
    const {
      title,
      image,
      category,
      content,
      professor,
      center,
      price,
      discounted_price
    } = this.state.courseItem;


     const bannerStyles = {
    //   backgroundImage: "url(" + banner_image_url + ")",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center"
    }; 

    const logoStyles = {
      width: "200px"
    };
    return (
      <div className="course-detail-wrapper">
        <div className="banner" style={bannerStyles}>
          <img src={logo_url} style={logoStyles} />
        </div>

        <div className="course-detail-description-wrapper">
          <div className="description">{content}</div>
        </div>

        <div className="bottom-content-wrapper">
          <a href={url} className="site-link" target="_blank">
            Visit {title}
          </a>
        </div>
      </div>
    )
  }

}
