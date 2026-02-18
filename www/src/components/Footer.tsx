import React from 'react';
import { get_sitemap } from 'constants/AppConstants';

const Footer: React.FC = () => {
  const sitemap_url = get_sitemap();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="seperator" />
        <ul className="nav nav-pills nav-fill">
          <li className="nav-item">
            <a className="nav-link" href="mailto:stephenHamilton@mac.com?subject=CV request" title="Request my cv">
              <span className="icon-mail" />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="http://twitter.com/shamiltonUK" title="Twitter">
              <span className="icon-twitter-square" />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://github.com/pieshop" title="Github">
              <span className="icon-github" />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="http://uk.linkedin.com/in/stephenhamilton" title="Linkedin">
              <span className="icon-linkedin" />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href={sitemap_url} target="_blank" rel="noreferrer" title="Sitemap">
              <span className="icon-sitemap" />
            </a>
          </li>
        </ul>
        <div className="seperator" />
        <div className="row justify-content-center">
          <div className="col-xs-2 text-center">
            <span className="text-muted credit">© {year} Stephen Hamilton</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
