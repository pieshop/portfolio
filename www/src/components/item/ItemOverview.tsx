import React, { Fragment } from 'react';
import { Box, Button, Card, Flex, Heading, Separator, Text } from '@radix-ui/themes';
import { Link } from 'react-router';
import ItemDetails from 'components/item/ItemDetails';

interface LinkItem {
  label: string;
  url: string;
}

interface ItemOverviewProps {
  is_archive?: boolean;
  client_id?: string;
  entry_id?: string;
  client_label?: string;
  title?: string;
  description?: string;
  responsibilities?: string;
  affiliation?: string;
  affiliation_url?: string;
  year?: number;
  has_archive?: boolean;
  links?: LinkItem[];
  has_links?: boolean;
  has_archive_or_links?: boolean;
  linkTo?: string;
  technologies?: string;
  territories?: string;
  has_frameworks?: boolean;
  frameworks?: Array<{ name: string; url?: string }>;
  platforms?: string;
  [key: string]: unknown;
}

const ItemOverview: React.FC<ItemOverviewProps> = ({
  is_archive,
  client_id,
  entry_id,
  client_label,
  title,
  description,
  responsibilities,
  affiliation,
  affiliation_url,
  year,
  has_archive,
  links = [],
  has_links,
  has_archive_or_links,
  linkTo,
  technologies,
  territories,
  has_frameworks,
  frameworks,
  platforms,
}) => {
  return (
    <Box>
      <Card style={{ marginBottom: 'var(--space-4)' }}>
        <Box p="4" style={{ backgroundColor: 'var(--accent-9)', color: 'white' }}>
          <Heading size="5" align="center">
            {client_label} : {title}
          </Heading>
        </Box>
        <Box p="4">
          <Text as="div" size="4" dangerouslySetInnerHTML={{ __html: description || '' }} />
        </Box>
        <Box p="4">
          <Heading size="4">Responsibilities</Heading>
          <Text as="p" dangerouslySetInnerHTML={{ __html: responsibilities || '' }} />
        </Box>

        {has_archive_or_links && !is_archive && (
          <Box p="4">
            <Flex align="center" gap="2">
              {has_archive && linkTo && (
                <Button size="1" color="cyan" variant="soft" asChild>
                  <Link to={linkTo} data-entryid={entry_id} data-clientid={client_id} title="View archive">
                    View archive
                  </Link>
                </Button>
              )}
              {has_links && (
                <>
                  {links.map((link) => (
                    <Button key={link.label} size="1" color="green" variant="soft" asChild>
                      <a target="_blank" rel="noreferrer" href={link.url} title={link.label}>
                        {link.label}
                      </a>
                    </Button>
                  ))}
                </>
              )}
            </Flex>
          </Box>
        )}

        {is_archive && linkTo && (
          <Box p="4">
            <Button size="1" color="cyan" variant="soft" asChild>
              <Link to={linkTo} data-entryid={entry_id} data-clientid={client_id} title="Back">
                Back
              </Link>
            </Button>
          </Box>
        )}

        <ItemDetails
          client_label={client_label}
          technologies={technologies}
          territories={territories}
          has_frameworks={has_frameworks}
          frameworks={frameworks}
          platforms={platforms}
        />

        <Separator size="4" my="2" style={{ color: "#000" }} />

        <Box p="2">
          <Text align="right" as="p">
            <a target="_blank" rel="noreferrer" href={affiliation_url}>
              {affiliation}
            </a>{' '}
            {year}
          </Text>
        </Box>
      </Card>
    </Box>
  );
};

export default ItemOverview;
