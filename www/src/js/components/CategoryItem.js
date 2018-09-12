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
      <div class="item__container col-xs-6 col-sm-6 col-md-4 col-lg-3 col-xl-2">
        <li class="list__item--subtle_shadow">
          <article id={id}>
            <Link
              to={to}
              class="item__thumbnail"
              data-entryid={entry_id}
              data-clientid={client_id}
              title={title}
            >
              <LazyLoad
                key={id}
                height={350}
                placeholder={<Placeholder is_responsive={is_responsive} />}
                debounce={100}
                once
              >
                <CategoryItemImage
                  key={id}
                  title={title}
                  thumb_path={thumb_path}
                  is_responsive={is_responsive}
                />
              </LazyLoad>
            </Link>

            <div class="item__decoration text-center">
              <div class="decoration decoration__left" />
              <div class="decoration decoration__right" />
            </div>

            <div class="item__caption text-center">
              <dl class="dl-vertical">
                <dt class="project-title">{title}</dt>
                <dd class="client">{client_label}</dd>
                <dd class="year">
                  {year}
                  {awards && <span class="item__awards">{awards.map(this.renderAward)}</span>}
                </dd>
              </dl>
            </div>
          </article>
        </li>
        <div class="entry-spacer" />
      </div>
    );
  }
  renderAward(data, index) {
    // console.log('renderAward', data);
    return <CategoryItemAward key={data.id} {...data} index={index} />;
  }
}
