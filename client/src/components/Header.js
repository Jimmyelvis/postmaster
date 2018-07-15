import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';



class Header extends Component {

  renderContent() {

    switch (this.props.auth) {

      case null:
        return;

      case false:
        return <li><a href="/auth/google">Login With Google</a></li>;

      default:
          return [
            <ul key="4">
                <li className="payments" key="1"><Payments /></li>
                <li className="credits" key="3">
                  Credits: {this.props.auth.credits}
                </li>
                <li className="logout" key="2"><a href="/api/logout">Logout</a></li>
            </ul>
          ];


    }

  }


  render(){
    return(
      <nav>
        <div className="row">

            <div className="col-md-3 col-sm-3 col-xs-3 brand-logo">

              <Link
                to={this.props.auth ? '/surveys' : '/'}
                >
                <img src="images/logo-smlr.png" alt=""/>
              </Link>

            </div>

            <div className="menu col-md-offset-5 col-md-4 col-sm-offset-3 col-sm-6
              col-xs-offset-0 col-xs-9">
               {this.renderContent()}
            </div>

        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
