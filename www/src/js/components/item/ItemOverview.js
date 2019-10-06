/**
 * Created by stephenhamilton on 24/02/2017.
 */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
const ItemOverview = ({
  is_archive,
  client_id,
  entry_id,
  client_label,
  title,
  description,
  responsibilities,
  affiliation,
  affiliation_url,
  year,
  has_archive,
  links,
  has_links,
  has_archive_or_links,
  linkTo,
}) => {
  return (
    <div className="item__overview">
      <div className="card mb-3">
        <div className="card-body card-inverse bg-primary text-white">
          <h3 className="card-title text-center">
            {client_label} : {title}
          </h3>
        </div>
        <div className="card-body">
          <div className="card-text lead" dangerouslySetInnerHTML={{ __html: description }} />
        </div>
        <div className="card-body">
          <h4 className="card-title">Responsibilities</h4>
          <p className="card-text" dangerouslySetInnerHTML={{ __html: responsibilities }} />
        </div>

        {has_archive_or_links && !is_archive && (
          <div className="card-body">
            <div className="d-flex w-100 justify-content-start">
              {has_archive && (
                <Link
                  to={linkTo}
                  className="btn btn-sm btn-info mr-2"
                  data-entryid={entry_id}
                  data-clientid={client_id}
                  title="View archive"
                >
                  View archive
                </Link>
              )}
              {has_links && (
                <Fragment>
                  {links.map((link, index) => {
                    return (
                      <a
                        key={link.label}
                        className="btn btn-sm btn-success mr-2"
                        target="_blank"
                        rel="noreferrer"
                        href={link.url}
                        title={link.label}
                      >
                        {link.label}
                      </a>
                    );
                  })}
                </Fragment>
              )}
            </div>
          </div>
        )}

        {is_archive && (
          <div className="card-body">
            <Link
              to={linkTo}
              className="btn btn-sm btn-info"
              data-entryid={entry_id}
              data-clientid={client_id}
              title="View archive"
            >
              Back
            </Link>
          </div>
        )}

        <div role="presentation" className="details-seperator" />
        <div className="card-body">
          <p className="text-right">
            <a target="_blank" rel="noreferrer" href={affiliation_url}>
              {affiliation}
            </a>{' '}
            {year}
            {/*<Link to={this.props.affiliation_url}>{this.props.affiliation}</Link> {this.props.year}*/}
          </p>
        </div>
      </div>
    </div>
  );
};
export default ItemOverview;
