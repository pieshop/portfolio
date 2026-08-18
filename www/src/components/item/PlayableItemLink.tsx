import React from 'react';
import { Button } from '@radix-ui/themes';
import type { PlayableItem } from 'containers/CommodorePlayer';

interface PlayableItemLinkProps {
  playable: PlayableItem;
}

const PlayableItemLink: React.FC<PlayableItemLinkProps> = ({ playable }) => {
  return (
    <Button size="3" variant="solid" className="playable-trigger" asChild>
      <a href={playable.routeUrl} target="_blank" rel="noreferrer">
        {playable.title}
      </a>
    </Button>
  );
};

export default PlayableItemLink;
