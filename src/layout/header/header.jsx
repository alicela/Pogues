import React from 'react';
import { Link } from 'react-router';

import logo from './logo-insee.png';
import UserConnectionContainer from 'layout/user/user-connection';
import Dictionary from 'utils/dictionary/dictionary';

function Header() {
  return (
    <nav id="header">
      <div id="header-wrapper">
        <div className="header-brand">
          <dipv className="header-logo">
            <img alt="{Dictionary.homepage}" src={logo} />
          </dipv>
          <h2>
            <Link className="header-homepage" to="/">
              Pogues
            </Link>
          </h2>
          <h6>{Dictionary.headerSubtitle}</h6>
        </div>
        <div className="header-help">
          <a target="_blank" href="http://inseefr.github.io/Pogues/user/">
            <span className="glyphicon glyphicon-question-sign" />
            <br />
            {Dictionary.HELP}
          </a>
        </div>
        <div className="header-user">
          <UserConnectionContainer />
        </div>
      </div>
    </nav>
  );
}

export default Header;
