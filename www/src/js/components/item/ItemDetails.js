/**
 * Created by stephenhamilton on 24/02/2017.
 */
import React, { Component } from 'react';

export default class ItemDetails extends Component {
  render() {
    const {
      client_label,
      technologies,
      territories,
      has_frameworks,
      frameworks,
      platforms,
    } = this.props;

    return (
      <div className="item__details">
        <div className="card mb-3">
          <div className="card-body block-header">
            <h3 className="card-title">Details</h3>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item flex-column align-items-start">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Client</h5>
                <span>{client_label}</span>
              </div>
            </li>

            <li className="list-group-item flex-column align-items-start">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Tech</h5>
                <span>{technologies}</span>
              </div>
            </li>

            {has_frameworks && (
              <li className="list-group-item flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">Frameworks / Libraries</h5>
                  <span className="flex-row">{frameworks.map(this.renderFramework)}</span>
                </div>
              </li>
            )}

            {platforms !== '' && (
              <li className="list-group-item flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">Platforms</h5>
                  <span>{platforms}</span>
                </div>
              </li>
            )}

            {territories !== '' && (
              <li className="list-group-item flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">Territories</h5>
                  <span>{territories}</span>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }

  renderFramework = (data) => {
    let fragment = data.name;
    if (data.url) {
      fragment = (
        <a className="p-1" key={data.name} href={data.url} rel="noreferrer" target="_blank">
          {data.name}
        </a>
      );
    }
    return fragment;
  };
}
