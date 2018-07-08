import React from 'react';

const Landing = () => {

  return (

    <div className="container">

          <div className="loginbox">

              <div className="title row">

                    <div className="logo col-md-4 col-sm-4 col-xs-4">

                        <img src="images/logo-lrg.png" alt=""/>

                    </div>

                    <div className="heading col-md-8 col-sm-8 col-xs-8">

                        <h1>The PostMaster</h1>
                        <h2>Send Followup Suverys to Customers</h2>

                    </div>

              </div>

              <div className="welmsg row">

                    <p>
                      Welcome to The PostMaster where you can send followup
                      surveys to your customers.
                    </p>

              </div>

              <div className="picrow row">

                  <ul>
                    <li><img src="images/573565.jpg" alt=""/></li>
                    <li><img src="images/fdsa.jpg" alt=""/></li>
                    <li><img src="images/pie-graph-illustration-669621.jpg" alt=""/></li>
                  </ul>

              </div>

              <div className="loginbtns row">

                  <ul>
                    <li><img src="images/btn-facebook.png" alt=""/></li>
                    <li><a href="/auth/google"><img src="images/btn-google.png" alt=""/></a></li>
                  </ul>

              </div>

          </div>

    </div>

  );

};

export default Landing;
