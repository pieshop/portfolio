import React from 'react';
import ArchiveItemIframe from 'components/item/ArchiveItemIframe';
import * as constants from 'constants/AppConstants';

interface ArchiveMediaItem {
  id?: string;
  media_type?: string;
  [key: string]: unknown;
}

interface ArchiveItemMediaListProps {
  mediaItems: ArchiveMediaItem[] | null | undefined;
}

const ArchiveItemMediaList: React.FC<ArchiveItemMediaListProps> = ({ mediaItems }) => {
  const items = mediaItems || [];

  return (
    <ul className="item__media">
      {items.map((data, index) => {
        if (data.media_type === constants.IFRAME) {
          return <ArchiveItemIframe key={data.id || index} {...data} />;
        }
        return null;
      })}
    </ul>
  );
};

export default ArchiveItemMediaList;
