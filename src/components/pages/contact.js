import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import contactPicture from "../../../static/assets/images/auth/login.jpg"

export default function () {
  return (
    <div className="content-page-wrapper">
      <div
        className="left-column"
        style={{
          background: "url(" + contactPicture + ") no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />
      <div className="right-column">
        <div className='contact-bullet-points'>
          <div className='bullet-point-group'>
            <div className='icon'>
              <FontAwesomeIcon icon="phone"/>
            </div>
            <div className='text'>
              55-555-5555
            </div>
          </div>
          <div className='bullet-point-group'>
            <div className='icon'>
              <FontAwesomeIcon icon="envelope"/>
            </div>
            <div className='text'>
              alonso@example.com
            </div>
          </div>
          <div className='bullet-point-group'>
            <div className='icon'>
              <FontAwesomeIcon icon="map-marked-alt"/>
            </div>
            <div className='text'>
              Orio - (Guipuzcoa)
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
