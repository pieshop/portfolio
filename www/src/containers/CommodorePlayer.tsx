import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router';
import { Box, Button, Card, Flex, Heading, Text } from '@radix-ui/themes';
import { Helmet } from 'react-helmet-async';
import portfolioData from '../assets/json/portfolio.json';

export interface PlayableItem {
  id: string;
  type: 'commodore';
  title: string;
  routeUrl: string;
  playerUrl: string;
  machine?: string;
  memory?: string;
  emulatorCore?: string;
  controls?: string[];
}

const isPlayableItem = (playable: unknown): playable is PlayableItem => {
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

const commodorePlayables = portfolioData.entries
  .flatMap((entry) => ((entry as { playables?: unknown[] }).playables || []))
  .filter(isPlayableItem);

const CommodorePlayer: React.FC = () => {
  const { game_id = '' } = useParams<{ game_id: string }>();
  const playable = commodorePlayables.find((item) => item.id === game_id);

  useEffect(() => {
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    const gameControlKeys = new Set(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'Spacebar']);
    const preventPageScroll = (event: KeyboardEvent) => {
      if (gameControlKeys.has(event.key)) {
        event.preventDefault();
      }
    };

    window.addEventListener('keydown', preventPageScroll, { capture: true });
    return () => {
      window.removeEventListener('keydown', preventPageScroll, { capture: true });
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
    };
  }, []);

  if (!playable) {
    return (
      <Box className="commodore-player-page" py="6">
        <Helmet>
          <title>Commodore Game Not Found</title>
        </Helmet>
        <Card className="commodore-player-card">
          <Flex direction="column" gap="4">
            <Heading size="6">Game not found</Heading>
            <Text color="gray">This Commodore game route is not configured.</Text>
            <Button asChild variant="soft">
              <Link to="/game/anirog/variousgames">Back to 8-bit Games</Link>
            </Button>
          </Flex>
        </Card>
      </Box>
    );
  }

  const gameTitle = playable.title.replace(/^Play\s+/i, '');

  return (
    <Box className="commodore-player-page">
      <Helmet>
        <title>{gameTitle} : Commodore Game</title>
        <meta name="Description" content={`Play ${gameTitle} in a browser-based Commodore emulator.`} />
      </Helmet>

      <Box className="playable-frame-shell commodore-player-frame-shell">
        <iframe
          className="playable-frame"
          src={playable.playerUrl}
          title={gameTitle}
          allow="fullscreen; gamepad"
        />
      </Box>

      {Array.isArray(playable.controls) && playable.controls.length > 0 && (
        <Box className="commodore-player-help" aria-label="Game controls">
          <Flex gap="2" wrap="wrap">
            {playable.controls.map((control) => (
              <Text key={control} as="span" size="1" className="commodore-player-help-key">
                {control}
              </Text>
            ))}
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default CommodorePlayer;
