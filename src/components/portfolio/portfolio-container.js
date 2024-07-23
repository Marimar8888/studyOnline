import React, { Component } from "react";
import axios from 'axios';

import PortfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true, // Inicializar como true para mostrar un mensaje de carga inicialmente
      data: []
    };
  }

  componentDidMount() {
    this.getPortfolioItems();
  }

    getPortfolioItems(filter = null) {
      axios.get('https://alonsomarimar.devcamp.space/portfolio/portfolio_items')
        .then(response => {
          if(filter){
            this.setState({
              data: response.data.portfolio_items.filter(item => {
                return item.category === filter;
              })
            });
          }else{
            this.setState({
              data: response.data.portfolio_items, // Asegúrate de que el nombre de la propiedad es correcto
              isLoading: false
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.setState({ isLoading: false }); // Maneja el estado de carga en caso de error
        });
    }

    handleFilter(filter) {
      if (filter === "CLEAR_FILTERS") {
        this.getPortfolioItems();
      } else {
        this.getPortfolioItems(filter);
      }
    }

    portfolioItems() {
      return this.state.data.map(item => {
        return <PortfolioItem key={item.id} item={item} />;
      });
    }

    render() {
      if (this.state.isLoading) {
        return <div>Loading...</div>;
      }

      return (
        <div className="homepage-wrapper">
          <div className="filter-links">
            <button
              className="btn"
              onClick={() => this.handleFilter("Education")}
            >
              Education
            </button>
            <button
              className="btn"
              onClick={() => this.handleFilter("Tecnology")}
            >
              Tecnology
            </button>
            <button
              className="btn"
              onClick={() => this.handleFilter("Website")}
            >
              Website
            </button>
            <button
              className="btn"
              onClick={() => this.handleFilter("Business Application")}
            >
              Business Application
            </button>
            <button
              className="btn"
              onClick={() => this.handleFilter("Social Media")}
            >
              Social Media
            </button>
            <button
              className="btn"
              onClick={() => this.handleFilter("CLEAR_FILTERS")}
            >
              All
            </button>
          </div>
          <div className="portfolio-items-wrapper">{this.portfolioItems()}</div>
        </div>
      );
    }
  }