import React from 'react';
import { Badge, Box, Flex, Grid, Link, Text } from '@radix-ui/themes';

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
  const splitValues = (value?: string) =>
    value?.split(',').map(v => v.trim()).filter(Boolean) ?? [];

  return (
    <Grid columns={{ initial: '2', sm: '3', md: '4' }} gap="4" px="4" py="3">
      <Box>
        <Text size="1" color="gray" as="p">Client</Text>
        <Badge color="violet">{client_label}</Badge>
      </Box>
      <Box>
        <Text size="1" color="gray" as="p">Tech</Text>
        <Flex gap="1" wrap="wrap">
          {splitValues(technologies).map(t => <Badge key={t} color="violet">{t}</Badge>)}
        </Flex>
      </Box>
      {has_frameworks && (
        <Box>
          <Text size="1" color="gray" as="p">Frameworks / Libraries</Text>
          <Flex gap="1" wrap="wrap">
            {frameworks.map(data => data.url ? (
              <Badge key={data.name} color="violet" asChild>
                <Link href={data.url} rel="noreferrer" target="_blank">{data.name}</Link>
              </Badge>
            ) : (
              <Badge key={data.name} color="violet">{data.name}</Badge>
            ))}
          </Flex>
        </Box>
      )}
      {platforms && (
        <Box>
          <Text size="1" color="gray" as="p">Platforms</Text>
          <Flex gap="1" wrap="wrap">
            {splitValues(platforms).map(p => <Badge key={p} color="violet">{p}</Badge>)}
          </Flex>
        </Box>
      )}
      {territories && (
        <Box>
          <Text size="1" color="gray" as="p">Territories</Text>
          <Flex gap="1" wrap="wrap">
            {splitValues(territories).map(t => <Badge key={t} color="violet">{t}</Badge>)}
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default ItemDetails;
