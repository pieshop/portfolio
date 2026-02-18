import React from 'react';

interface MediaInfo {
  media_path?: string;
  width?: number;
  height?: number;
}

interface MediaNames {
  media_name?: string;
}

interface ItemVIDEOProps {
  media_info: MediaInfo;
  media_names: MediaNames;
  style?: string;
}

const ItemVIDEO: React.FC<ItemVIDEOProps> = ({ media_info, media_names, style }) => {
  const { media_path = '', width, height } = media_info;
  const { media_name = '' } = media_names;
  return (
    <div className={style}>
      <div className="thumbnail">
        <video width={width} height={height} controls>
          <source src={media_path + media_name} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default ItemVIDEO;
