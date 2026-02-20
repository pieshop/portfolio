import React from "react";
import ArchiveItemIframe from "components/item/ArchiveItemIframe";
import * as constants from "constants/AppConstants";
import { Box, Card, Grid } from "@radix-ui/themes";

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
    <Box>
      <Card style={{ marginBottom: "var(--space-4)" }}>
          <Grid columns={{ initial: '1', sm: '2', md: '3', lg: '4' }} gap="3">
          {items.map((data, index) => {
            if (data.media_type === constants.IFRAME) {
              return <ArchiveItemIframe key={data.id || index} {...data} />;
            }
            return null;
          })}
          </Grid>
      </Card>
    </Box>
  );
};

export default ArchiveItemMediaList;
