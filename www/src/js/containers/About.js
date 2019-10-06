/**
 * Created by stephenhamilton on 24/02/2017.
 */
import { TweenLite } from 'gsap/TweenLite';
import { CSSPlugin } from 'gsap/CSSPlugin';
import React, { Component } from 'react';
import { DEFAULT_YEAR, get_base_assets_path } from 'constants/AppConstants';
import { connect } from 'react-redux';
import Utils from 'utils/Utils';
import { selectCategory, selectYear } from 'store/categories/categoriesActions';
import Helmet from 'react-helmet/es/Helmet';

class About extends Component {
  componentDidMount() {
    this.props.selectCategory('about');
    this.props.selectYear(DEFAULT_YEAR);
    const plugins = [CSSPlugin]; // stop treeshaking :https://greensock.com/docs/NPMUsage
    TweenLite.to(this.item_ref, 0.3, { opacity: 1, ease: Power1.easeIn });
  }

  render() {
    const BASE_ASSETS_URL = get_base_assets_path();
    const opacity = { opacity: 0 };
    const experience_years = Utils.convertIntToWords(new Date().getFullYear() - 1996);
    return (
      <div className="main_region" ref={(item) => (this.item_ref = item)} style={opacity}>
        <Helmet>
          <title>About Me</title>
          <meta
            name="Description"
            content="Portfolio website for London based interactive developer Stephen Hamilton"
          />
        </Helmet>
        <div className="aboutme">
          <div className="row">
            <div className="col">
              <div className="page-header">
                <h1>In a nut shell....</h1>
              </div>
            </div>
          </div>

          <div className="row justify-content-around">
            {/*<div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 text-center">*/}
            {/*<img*/}
            {/*width="740"*/}
            {/*height="740"*/}
            {/*className="img-fluid img-thumbnail"*/}
            {/*// crossOrigin="anonymous"*/}
            {/*alt="Profile image"*/}
            {/*srcSet={*/}
            {/*BASE_ASSETS_URL +*/}
            {/*'/images/about/profile_3x.jpg 3x,' +*/}
            {/*BASE_ASSETS_URL +*/}
            {/*'/images/about/profile_2x.jpg 2x,' +*/}
            {/*BASE_ASSETS_URL +*/}
            {/*'/images/about/profile_1x.jpg 1x'*/}
            {/*}*/}
            {/*src={BASE_ASSETS_URL + '/images/about/profile_1x.jpg'}*/}
            {/*/>*/}
            {/*</div>*/}
            {/*<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">*/}
            <div className="col-md-12">
              <img
                crossOrigin="anonymous"
                width="147"
                height="303"
                className="img-fluid float-left ml-3 pr-5"
                alt="Profile image"
                src={BASE_ASSETS_URL + '/images/about/profile.png'}
              />
              <p className="lead">
                I am a developer with <mark>{experience_years}</mark>
                years experience (twelve years full-time agency) specialising in interactive
                development using front-end technologies. I am also a creative problem-solver and
                lateral thinker with good communication skills and the ability to work well in a
                team-based environment.
              </p>

              <p>
                I actively enjoy experimenting with new technologies whilst keeping up to date with
                current industry trends and best practices, and strive to integrate any learnings
                into future projects.
              </p>

              <p>
                I am comfortable working on a broad range of project types in a fast-paced
                environment. I am equally able to handle a large multi-language, multi-format ad
                unit rollout, a complex web or game based project, or investigate and then create a
                prototype with a new technology.
              </p>

              <p>
                Over the years I have worked on a wide range of online media, from large scale
                multi-market campaigns and interactive rich media to more targeted bespoke rich
                media executions. During this time I have also worked with most of the major
                ad-server platforms (DoubleClick, Eyeblaster, Flashtalking).
              </p>
            </div>
          </div>

          <div className="details-seperator" />

          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Technologies</h3>
              <p className="card-text mb-2 text-muted">
                Below is a selection of some of the languages, tools and frameworks I have used over
                the years.
              </p>
            </div>

            <div className="card-deck">
              <div className="card card-inverse bg-info mb-3 text-center">
                <div className="card-body">
                  <h3 className="card-title text-white">SDKs, Frameworks, Libraries</h3>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item list-group-item-info text-left">
                    React, Redux, Vue, Backbone, MarionetteJS, JQuery
                  </li>
                  <li className="list-group-item list-group-item-info text-left">
                    JSX, SASS, LESS, Stylus, Bootstrap, Handlebars, Mustache
                  </li>
                  <li className="list-group-item list-group-item-info text-left">
                    Babel, Webpack, Browserify, RequireJS
                  </li>
                  <li className="list-group-item list-group-item-info text-left">
                    RobotLegs, PureMVC
                  </li>
                  <li className="list-group-item list-group-item-info text-left">Laravel</li>
                </ul>
              </div>
              <div className="card card-inverse bg-info mb-3 text-center">
                <div className="card-body">
                  <h3 className="card-title text-white">Tools</h3>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item list-group-item-info text-left">
                    IntelliJ, Webstorm, XCode, Android Studio, Eclipse, Unity
                  </li>
                  <li className="list-group-item list-group-item-info text-left">
                    Subversion, Git
                  </li>
                  <li className="list-group-item list-group-item-info text-left">
                    NPM, Grunt/Gulp, Yeoman, Bower, Ant, Bash
                  </li>
                  <li className="list-group-item list-group-item-info text-left">
                    Flash Authoring, Photoshop, Illustrator, TexturePacker
                  </li>
                  <li className="list-group-item list-group-item-info text-left">Jira</li>
                </ul>
              </div>
            </div>

            <div className="card-deck">
              <div className="card card-inverse bg-info mb-3 text-center">
                <div className="card-body">
                  <h3 className="card-title text-white">Languages</h3>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item list-group-item-info text-left">
                    Javascript, HTML5, CSS3
                  </li>
                  <li className="list-group-item list-group-item-info text-left">PHP, MySql, C#</li>
                  <li className="list-group-item list-group-item-info text-left">
                    ActionScript 1-3
                  </li>
                </ul>
              </div>
              <div className="card card-inverse bg-info mb-3 text-center">
                <div className="card-body">
                  <h3 className="card-title text-white">Online Media</h3>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item list-group-item-info text-left">
                    3rd party ad serving
                  </li>
                  <li className="list-group-item list-group-item-info text-left">
                    omniture, doubleclick, tangozebra, mediamind, flashtalking
                  </li>
                  <li className="list-group-item list-group-item-info text-left">&nbsp;</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectCategory: (category_id) => {
      dispatch(selectCategory(category_id));
    },
    selectYear: (year_id) => {
      dispatch(selectYear(year_id));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(About);
