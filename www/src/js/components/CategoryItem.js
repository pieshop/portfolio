/**
 * Created by stephenhamilton on 24/02/2017.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import CategoryItemAward from 'components/CategoryItemAward';
import CategoryItemImage from 'components/CategoryItemImage';
import Placeholder from 'components/Placeholder';

export default class CategoryItem extends Component {
  constructor() {
    super();
  }

  render() {
    const {
      id,
      title,
      to,
      client_label,
      entry_id,
      client_id,
      year,
      thumb_path,
      is_responsive,
      awards,
    } = this.props;
    return (
      <div className="item__container col-xs-6 col-sm-6 col-md-4 col-lg-3 col-xl-2">
        <li className="list__item--subtle_shadow">
          <article id={id}>
            <Link
              to={to}
              className="item__thumbnail"
              data-entryid={entry_id}
              data-clientid={client_id}
              title={title}
            >
              <LazyLoad
                key={id}
                height={350}
                placeholder={<Placeholder is_responsive={is_responsive} />}
                debounce={100}
                once={true}
              >
                <CategoryItemImage
                  key={id}
                  title={title}
                  thumb_path={thumb_path}
                  is_responsive={is_responsive}
                />
              </LazyLoad>
            </Link>

            <div className="item__decoration text-center">
              <div className="decoration decoration__left" />
              <div className="decoration decoration__right" />
            </div>

            <div className="item__caption text-center">
              <dl className="dl-vertical">
                <dt className="project-title">{title}</dt>
                <dd className="client">{client_label}</dd>
                <dd className="year">
                  {year}
                  {awards && <span className="item__awards">{awards.map(this.renderAward)}</span>}
                </dd>
              </dl>
            </div>
          </article>
        </li>
        <div className="entry-spacer" />
      </div>
    );
  }
  renderAward(data, index) {
    // console.log('renderAward', data);
    return <CategoryItemAward key={data.id} {...data} index={index} />;
  }
}
