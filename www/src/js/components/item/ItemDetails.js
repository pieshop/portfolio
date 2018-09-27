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
      <div class="item__details">
        <div class="card mb-3">
          <div class="card-body block-header">
            <h3 class="card-title">Details</h3>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">Client</h5>
                <span>{client_label}</span>
              </div>
            </li>

            <li class="list-group-item flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">Tech</h5>
                <span>{technologies}</span>
              </div>
            </li>

            {has_frameworks && (
              <li class="list-group-item flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">Frameworks / Libraries</h5>
                  <span class="flex-row">{frameworks.map(this.renderFramework)}</span>
                </div>
              </li>
            )}

            {platforms !== '' && (
              <li class="list-group-item flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">Platforms</h5>
                  <span>{platforms}</span>
                </div>
              </li>
            )}

            {territories !== '' && (
              <li class="list-group-item flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">Territories</h5>
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
        <a class="p-1" key={data.name} href={data.url} rel="noreferrer" target="_blank">
          {data.name}
        </a>
      );
    }
    return fragment;
  };
}
