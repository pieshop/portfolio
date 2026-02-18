import React from 'react';
import ItemPDF from 'components/item/ItemPDF';
import * as fileTypes from 'utils/fileTypes';
import ItemImagePlaceholder from './ItemImagePlaceholder';
import ItemImageDesktop from './ItemImageDesktop';
import ItemImageOLM from './ItemImageOLM';
import ItemImageSmartphone from 'components/item/ItemImageSmartphone';
import ItemVIDEO from 'components/item/ItemVIDEO';

interface MediaInfo {
  width?: number;
  height?: number;
  alt?: string;
  media_path?: string;
  image_type?: string;
  is_single_item?: boolean;
}

interface MediaItem {
  id?: string;
  media_type?: string;
  media_info: MediaInfo;
  media_names: Record<string, string>;
  [key: string]: unknown;
}

interface MediaImages {
  desktop?: MediaItem[];
  olm?: MediaItem[];
  smartphone?: MediaItem[];
}

interface MediaItems {
  images?: MediaImages;
  pdfs?: MediaItem[];
  videos?: MediaItem[];
}

interface ItemMediaListProps {
  mediaItems?: MediaItems | Record<string, unknown>;
}

const getStyle = (data: MediaInfo): string => {
  const { image_type, is_single_item } = data;
  if (is_single_item) return 'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center';
  if (image_type === fileTypes.IMAGE_DESKTOP) return 'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 text-center';
  if (image_type === fileTypes.IMAGE_OLM) return 'col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 text-center';
  if (image_type === fileTypes.IMAGE_SMARTPHONE) return 'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-4 text-center';
  return 'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center';
};

const renderImage = (data: MediaItem, style: string): React.ReactNode => {
  switch (data.media_info.image_type) {
    case fileTypes.IMAGE_DESKTOP:
      return <ItemImageDesktop key={data.id} style={style} media_info={data.media_info} media_names={data.media_names} />;
    case fileTypes.IMAGE_SMARTPHONE:
      return <ItemImageSmartphone key={data.id} style={style} media_info={data.media_info} media_names={data.media_names} />;
    case fileTypes.IMAGE_OLM:
      return <ItemImageOLM key={data.id} style={style} media_info={data.media_info} media_names={data.media_names} />;
    default:
      return null;
  }
};

const renderItem = (data: MediaItem): React.ReactNode => {
  const style = getStyle(data.media_info);
  const { width = 500, height = 500 } = data.media_info;
  switch (data.media_type) {
    case fileTypes.MEDIA_IMAGE: {
      return (
        <React.Fragment key={data.id}>
          <ItemImagePlaceholder style={style} width={width} height={height} />
          {renderImage(data, style)}
        </React.Fragment>
      );
    }
    case fileTypes.MEDIA_PDF:
      return <ItemPDF key={data.id} style={style} media_info={data.media_info} media_names={data.media_names} />;
    case fileTypes.MEDIA_VIDEO:
      return <ItemVIDEO key={data.id} style={style} media_info={data.media_info} media_names={data.media_names} />;
    default:
      return null;
  }
};

const ItemMediaList: React.FC<ItemMediaListProps> = ({ mediaItems = {} }) => {
  const { images = {}, pdfs = [], videos = [] } = mediaItems as MediaItems;
  const { desktop = [], olm = [], smartphone = [] } = images;

  return (
    <div className="item__media">
      {(desktop.length > 0 || olm.length > 0 || smartphone.length > 0) && (
        <div className="row">
          {desktop.map(renderItem)}
          {olm.map(renderItem)}
          {smartphone.map(renderItem)}
        </div>
      )}
      {pdfs.length > 0 && <div className="row">{pdfs.map(renderItem)}</div>}
      {videos.length > 0 && <div className="row">{videos.map(renderItem)}</div>}
    </div>
  );
};

export default ItemMediaList;
