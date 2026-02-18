import React from 'react';

interface Framework {
  name: string;
  url?: string;
}

interface ItemDetailsProps {
  client_label?: string;
  technologies?: string;
  territories?: string;
  has_frameworks?: boolean;
  frameworks?: Framework[];
  platforms?: string;
  [key: string]: unknown;
}

const ItemDetails: React.FC<ItemDetailsProps> = ({
  client_label,
  technologies,
  territories,
  has_frameworks,
  frameworks = [],
  platforms,
}) => {
  const renderFramework = (data: Framework) => {
    if (data.url) {
      return (
        <a className="p-1" key={data.name} href={data.url} rel="noreferrer" target="_blank">
          {data.name}
        </a>
      );
    }
    return data.name;
  };

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
                <span className="flex-row">{frameworks.map(renderFramework)}</span>
              </div>
            </li>
          )}
          {platforms !== '' && platforms !== undefined && (
            <li className="list-group-item flex-column align-items-start">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Platforms</h5>
                <span>{platforms}</span>
              </div>
            </li>
          )}
          {territories !== '' && territories !== undefined && (
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
};

export default ItemDetails;
