import React from 'react';
import { Box, Card, Grid } from "@radix-ui/themes";
import { useInView } from 'react-intersection-observer';
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
  if (is_single_item) return 'media-col--full';
  if (image_type === fileTypes.IMAGE_DESKTOP) return 'media-col--half';
  if (image_type === fileTypes.IMAGE_OLM) return 'media-col--third';
  if (image_type === fileTypes.IMAGE_SMARTPHONE) return 'media-col--quarter';
  return 'media-col--full';
};

const MediaImageCell: React.FC<{ data: MediaItem }> = ({ data }) => {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '200px 0px' });
  const { width = 500, height = 500, image_type } = data.media_info;

  const image = inView ? (() => {
    switch (image_type) {
      case fileTypes.IMAGE_DESKTOP:
        return <ItemImageDesktop media_info={data.media_info} media_names={data.media_names} />;
      case fileTypes.IMAGE_SMARTPHONE:
        return <ItemImageSmartphone media_info={data.media_info} media_names={data.media_names} />;
      case fileTypes.IMAGE_OLM:
        return <ItemImageOLM media_info={data.media_info} media_names={data.media_names} />;
      default:
        return null;
    }
  })() : <ItemImagePlaceholder width={width} height={height} />;

  return <div ref={ref}>{image}</div>;
};

const renderItem = (data: MediaItem): React.ReactNode => {
  const style = getStyle(data.media_info);
  switch (data.media_type) {
    case fileTypes.MEDIA_IMAGE:
      return (
        <div key={data.id} className={style}>
          <MediaImageCell data={data} />
        </div>
      );
    case fileTypes.MEDIA_PDF:
      return (
        <div key={data.id} className={style}>
          <ItemPDF media_info={data.media_info} media_names={data.media_names} />
        </div>
      );
    case fileTypes.MEDIA_VIDEO:
      return (
        <div key={data.id} className={style}>
          <ItemVIDEO media_info={data.media_info} media_names={data.media_names} />
        </div>
      );
    default:
      return null;
  }
};

const ItemMediaList: React.FC<ItemMediaListProps> = ({ mediaItems = {} }) => {
  const { images = {}, pdfs = [], videos = [] } = mediaItems as MediaItems;
  const { desktop = [], olm = [], smartphone = [] } = images;

  return (
    <Box>
      <Card>
      {(desktop.length > 0 || olm.length > 0 || smartphone.length > 0) && (
        <Grid columns={{ initial: '1', sm: '2', md: '3', lg: '4' }} gap="3">
          {desktop.map(renderItem)}
          {olm.map(renderItem)}
          {smartphone.map(renderItem)}
        </Grid>
      )}
      {pdfs.length > 0 && (
        <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="3">
          {pdfs.map(renderItem)}
        </Grid>
      )}
      {videos.length > 0 && (
        <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="3">
          {videos.map(renderItem)}
        </Grid>
      )}
      </Card>
    </Box>
  );
};

export default ItemMediaList;
