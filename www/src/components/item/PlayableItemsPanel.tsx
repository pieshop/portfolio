import React from 'react';
import { Box, Card, Flex, Heading, Text } from '@radix-ui/themes';
import PlayableItemLink from 'components/item/PlayableItemLink';
import type { PlayableItem } from 'containers/CommodorePlayer';

interface PlayableItemsPanelProps {
  playables: unknown[];
}

const isSupportedPlayable = (playable: unknown): playable is PlayableItem => {
  if (!playable || typeof playable !== 'object') return false;
  const candidate = playable as Partial<PlayableItem>;
  return (
    candidate.type === 'commodore' &&
    typeof candidate.id === 'string' &&
    typeof candidate.title === 'string' &&
    typeof candidate.routeUrl === 'string' &&
    typeof candidate.playerUrl === 'string'
  );
};

const PlayableItemsPanel: React.FC<PlayableItemsPanelProps> = ({ playables }) => {
  const supportedPlayables = playables.filter(isSupportedPlayable);

  if (supportedPlayables.length === 0) return null;

  return (
    <Card className="playable-panel">
      <Flex direction="column" gap="3">
        <Box>
          <Heading size="4" mb="1">
            Play the original games
          </Heading>
          <Text as="p" size="2" color="gray">
            Launch the Commodore versions in a browser-based emulator.
          </Text>
        </Box>
        <Flex gap="2" wrap="wrap">
          {supportedPlayables.map((playable) => (
            <PlayableItemLink key={playable.id} playable={playable} />
          ))}
        </Flex>
      </Flex>
    </Card>
  );
};

export default PlayableItemsPanel;
