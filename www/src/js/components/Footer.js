/**
 * Created by stephenhamilton on 24/02/2017.
 */
import React from 'react';
import { get_sitemap } from 'constants/AppConstants';

const Footer = (props) => {
  const sitemap_url = get_sitemap();
  const year = new Date().getFullYear();

  return (
    <footer class="footer">
      <div class="container-fluid">
        <div class="seperator" />
        <ul class="nav nav-pills nav-fill">
          <li class="nav-item">
            <a
              class="nav-link"
              href="mailto:stephenHamilton@mac.com?subject=CV request"
              data-toggle="tooltip"
              data-placement="top"
              title=""
              data-original-title="Request my cv"
            >
              <span class="icon-mail" />
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="http://twitter.com/shamiltonUK"
              data-toggle="tooltip"
              data-placement="top"
              title=""
              data-original-title="Twitter"
            >
              <span class="icon-twitter-square" />
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="https://github.com/pieshop"
              data-toggle="tooltip"
              data-placement="top"
              title=""
              data-original-title="Github"
            >
              <span class="icon-github" />
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="http://uk.linkedin.com/in/stephenhamilton"
              data-toggle="tooltip"
              data-placement="top"
              title=""
              data-original-title="Linkedin"
            >
              <span class="icon-linkedin" />
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href={sitemap_url}
              data-toggle="tooltip"
              data-placement="top"
              title=""
              target="_blank"
              data-original-title="Sitemap"
            >
              <span class="icon-sitemap" />
            </a>
          </li>
        </ul>
        <div class="seperator" />
        <div class="row justify-content-center">
          <div class="col-xs-2 text-center">
            <span class="text-muted credit">© {year} Stephen Hamilton</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
