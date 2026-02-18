import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAppDispatch } from 'store/configureStore';
import { DEFAULT_YEAR, get_base_assets_path } from 'constants/AppConstants';
import { selectCategory, selectYear } from 'store/categories/categoriesActions';
import Utils from 'utils/Utils';

const About: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(selectCategory('about') as unknown as { type: string });
    dispatch(selectYear(DEFAULT_YEAR) as unknown as { type: string });
  }, [dispatch]);

  const BASE_ASSETS_URL = get_base_assets_path();
  const experience_years = Utils.convertIntToWords(new Date().getFullYear() - 1996);

  return (
    <motion.div
      className="main_region"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeIn' }}
    >
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
              I am a developer with <mark>{experience_years}</mark> years experience (twelve years
              full-time agency) specialising in interactive development using front-end technologies.
              I am also a creative problem-solver and lateral thinker with good communication skills
              and the ability to work well in a team-based environment.
            </p>
            <p>
              I actively enjoy experimenting with new technologies whilst keeping up to date with
              current industry trends and best practices, and strive to integrate any learnings into
              future projects.
            </p>
            <p>
              I am comfortable working on a broad range of project types in a fast-paced
              environment. I am equally able to handle a large multi-language, multi-format ad unit
              rollout, a complex web or game based project, or investigate and then create a
              prototype with a new technology.
            </p>
            <p>
              Over the years I have worked on a wide range of online media, from large scale
              multi-market campaigns and interactive rich media to more targeted bespoke rich media
              executions. During this time I have also worked with most of the major ad-server
              platforms (DoubleClick, Eyeblaster, Flashtalking).
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
                <li className="list-group-item list-group-item-info text-left">RobotLegs, PureMVC</li>
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
                <li className="list-group-item list-group-item-info text-left">Subversion, Git</li>
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
                  Javascript, Typescript, HTML5, CSS3
                </li>
                <li className="list-group-item list-group-item-info text-left">PHP, MySql, C#</li>
                <li className="list-group-item list-group-item-info text-left">ActionScript 1-3</li>
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
    </motion.div>
  );
};

export default About;
