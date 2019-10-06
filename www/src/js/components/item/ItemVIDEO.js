/**
 * Created by stephenhamilton on 24/02/2017.
 */
import React from 'react';

const ItemVIDEO = ({ media_info, media_names, style }) => {
  const { media_path, width, height } = media_info;
  const { media_name } = media_names;
  // console.log('ItemPDF', media_name, media_path);
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
