import React from 'react';
import { Box, Grid, Text } from '@radix-ui/themes';

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
        <a key={data.name} href={data.url} rel="noreferrer" target="_blank" style={{ marginRight: '0.4rem' }}>
          {data.name}
        </a>
      );
    }
    return <span key={data.name} style={{ marginRight: '0.4rem' }}>{data.name}</span>;
  };

  return (
    <Grid columns={{ initial: '2', sm: '3', md: '4' }} gap="4" px="4" py="3">
      <Box>
        <Text size="1" color="gray" as="p">Client</Text>
        <Text size="2" weight="medium">{client_label}</Text>
      </Box>
      <Box>
        <Text size="1" color="gray" as="p">Tech</Text>
        <Text size="2">{technologies}</Text>
      </Box>
      {has_frameworks && (
        <Box>
          <Text size="1" color="gray" as="p">Frameworks / Libraries</Text>
          <Text size="2" as="span">{frameworks.map(renderFramework)}</Text>
        </Box>
      )}
      {platforms && (
        <Box>
          <Text size="1" color="gray" as="p">Platforms</Text>
          <Text size="2">{platforms}</Text>
        </Box>
      )}
      {territories && (
        <Box>
          <Text size="1" color="gray" as="p">Territories</Text>
          <Text size="2">{territories}</Text>
        </Box>
      )}
    </Grid>
  );
};

export default ItemDetails;
