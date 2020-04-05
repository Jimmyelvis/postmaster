import React, { Component } from "react";
import Header from "./Header";
import Modal from "./Modal/Modal";
import Footer from './Footer'

class About  extends Component  {

  constructor() {
    super();

    this.state = {
      isShowing: false
    };
  }

  openModalHandler = e => {
    e.preventDefault();
    this.setState({
      isShowing: true
    });
  };

  closeModalHandler = () => {
    this.setState({
      isShowing: false
    });
  };

  render(){

    return (

      <React.Fragment>

        {this.state.isShowing ? (
            <div onClick={this.closeModalHandler} className="back-drop" />
          ) : null}

          {/* <button className="open-modal-btn" onClick={this.openModalHandler}>
            Open Modal
          </button> */}

        

          <Header />
          <div className="about">
    
              <div className="content">

                <div className="left">
                    <img src="images/square-images.png" alt=""/>

                </div>

                <div className="right">

                <h2 className="heading-2 mb-md">Who we are</h2>

                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus eligendi itaque tempore qui assumenda tempora quo enim ad non totam delectus voluptas dolore ex dolorem deleniti obcaecati, quidem, laboriosam iusto ea illum? Modi adipisci iste praesentium fuga aut quis velit aliquam, neque, totam nemo maxime ab magni! Mollitia doloremque nobis enim saepe a ullam iste quia atque nihil, natus eaque, corporis nisi ea, voluptatibus amet exercitationem. Eos cumque maiores, illum exercitationem eum quas? Accusamus, voluptas modi. Neque aliquam perferendis beatae itaque veritatis adipisci et dolorem sit tempore qui tenetur alias consequatur assumenda voluptate, voluptatum nostrum officia possimus quaerat. Accusamus id consectetur deleniti magnam optio autem fugit saepe ducimus inventore libero. 
                    </p>
                </div>
              </div>

          <Footer />
          </div>
          

         
      </React.Fragment>
    );

  }

 
};

export default About;
