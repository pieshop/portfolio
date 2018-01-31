/**
 * Created by stephenhamilton on 24/02/2017.
 */
import React from 'react';
import {Link} from 'react-router-dom';
const ItemOverview = ({is_archive, client_id, entry_id, client_label, title, description, responsibilities, affiliation, affiliation_url, year,
                        has_archive, links, has_links, has_archive_or_links, linkTo}) => {
    return (
        <div class="item__overview">
            <div class="card mb-3">
                <div class="card-body card-inverse bg-primary text-white">
                    <h3 class="card-title text-center">{client_label} : {title}</h3>
                </div>
                <div class="card-body">
                    <div class="card-text lead" dangerouslySetInnerHTML={{__html: description}}></div>
                </div>
                <div class="card-body">
                    <h4 class="card-title">Responsibilities</h4>
                    <p class="card-text" dangerouslySetInnerHTML={{__html: responsibilities}}></p>
                </div>

                {has_archive_or_links && !is_archive &&
                <div class="card-body">
                    <div class="d-flex w-100 justify-content-between">
                        {has_archive &&
                        <Link to={linkTo} class="btn btn-sm btn-info" data-entryid={entry_id} data-clientid={client_id} title="View archive">View
                            archive</Link>
                        }
                        {has_links &&
                        <span>
                                {links.map((link, index) => {
                                    return (
                                        <a key={link.label} class="btn btn-sm btn-success" target="_blank" href={link.url} title={link.label}>{link.label}</a>
                                    );
                                })}
                        </span>
                        }
                    </div>
                </div>
                }

                {is_archive &&
                <div class="card-body">
                    <Link to={linkTo} class="btn btn-sm btn-info" data-entryid={entry_id} data-clientid={client_id} title="View archive">Back</Link>
                </div>
                }

                <div role="presentation" class="details-seperator"></div>
                <div class="card-body">
                    <p class="text-right">
                        <a target="_blank" href={affiliation_url}>{affiliation}</a> {year}
                        {/*<Link to={this.props.affiliation_url}>{this.props.affiliation}</Link> {this.props.year}*/}
                    </p>
                </div>
            </div>
        </div>
    );
};
export default ItemOverview;
