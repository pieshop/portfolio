import React from 'react';
import { Box, Card, Flex, Grid, Heading, Separator, Text } from "@radix-ui/themes";

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
        <a key={data.name} href={data.url} rel="noreferrer" target="_blank" style={{ padding: '0 0.25rem' }}>
          {data.name}
        </a>
      );
    }
    return data.name;
  };

  return (
    <Box className="item__details">
      <Card style={{ marginBottom: 'var(--space-4)' }}>
        <Box p="4" className="block-header">
          <Heading size="4">Details</Heading>
        </Box>
        <Separator size="4" />
        <Box>
          {/*<Grid columns={{ initial: '1', sm: '2', md: '3', lg: '4' }} gap="3">*/}
            <Flex justify="between" align="center" px="4" py="2">
              <Text weight="bold">Client</Text>
              <Text>{client_label}</Text>
            </Flex>
            <Separator size="4" />
            <Flex justify="between" align="center" px="4" py="2">
              <Text weight="bold">Tech</Text>
              <Text>{technologies}</Text>
            </Flex>
            {has_frameworks && (
              <>
                <Separator size="4" />
                <Flex justify="between" align="center" px="4" py="2">
                  <Text weight="bold">Frameworks / Libraries</Text>
                  <Text as="span">{frameworks.map(renderFramework)}</Text>
                </Flex>
              </>
            )}
            {platforms !== '' && platforms !== undefined && (
              <>
                <Separator size="4" />
                <Flex justify="between" align="center" px="4" py="2">
                  <Text weight="bold">Platforms</Text>
                  <Text>{platforms}</Text>
                </Flex>
              </>
            )}
            {territories !== '' && territories !== undefined && (
              <>
                <Separator size="4" />
                <Flex justify="between" align="center" px="4" py="2">
                  <Text weight="bold">Territories</Text>
                  <Text>{territories}</Text>
                </Flex>
              </>
            )}
          {/*</Grid>*/}
        </Box>
      </Card>
    </Box>
  );
};

export default ItemDetails;
