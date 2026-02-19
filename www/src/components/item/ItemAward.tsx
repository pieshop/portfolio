import React, { Fragment, useState } from 'react';
import { Box, Button, Card, Flex, Heading, Text } from '@radix-ui/themes';
import ItemAwardModalPortal from 'components/item/ItemAwardModalPortal';
import { get_awards_path } from 'constants/AppConstants';

interface ItemAwardProps {
  award_name: string;
  award_long_name: string;
  award_result: string;
  award_category: string;
  link: string;
  pdf: string;
  hasLink: boolean;
  hasAwardCategory: boolean;
}

const ItemAward: React.FC<ItemAwardProps> = ({
  award_name,
  award_long_name,
  award_result,
  award_category,
  link,
  pdf,
  hasLink,
  hasAwardCategory,
}) => {
  const [showModal, setShowModal] = useState(false);
  const pdf_url = get_awards_path() + pdf;

  const handlePDFClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowModal((s) => !s);
  };

  return (
    <Card style={{ backgroundColor: 'var(--green-3)', marginBottom: 'var(--space-3)' }}>
      <Fragment>
        <Box p="4">
          <Flex direction="column" gap="2">
            <Heading size="4" title={award_long_name}>
              {award_name}
            </Heading>
            {hasLink ? (
              <Fragment>
                {pdf !== '' && (
                  <Button size="1" onClick={handlePDFClick} className="js-pdf-award">
                    pdf
                  </Button>
                )}
                {link !== '' && (
                  <Button size="1" asChild>
                    <a href={link} target="_blank" rel="noreferrer">
                      link
                    </a>
                  </Button>
                )}
              </Fragment>
            ) : (
              <Text size="1">&nbsp;</Text>
            )}
          </Flex>
        </Box>
        <Box p="4">
          <Text>
            <strong>{award_result}</strong>
            {hasAwardCategory && (
              <Text as="span" color="gray">
                : {award_category}
              </Text>
            )}
          </Text>
        </Box>
      </Fragment>
      <ItemAwardModalPortal
        award_name={award_name}
        award_result={award_result + ' : ' + award_category}
        open={showModal}
        onClose={() => setShowModal(false)}
        pdf={pdf_url}
      />
    </Card>
  );
};

export default ItemAward;
