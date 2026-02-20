import React from 'react';
import { Box, Card, Grid, Heading, Separator } from '@radix-ui/themes';
import ItemAward from 'components/item/ItemAward';

interface ItemAwardsProps {
  awards: Array<Record<string, unknown>>;
}

const ItemAwards: React.FC<ItemAwardsProps> = ({ awards }) => {
  return (
    <Box className="item__awards">
      <Card style={{ marginBottom: 'var(--space-4)' }}>
        <Box p="4" style={{ backgroundColor: 'var(--accent-9)', color: 'white' }}>
          <Heading size="4">Awards</Heading>
        </Box>
        <Separator size="4" />
        <Box p="4">
          <Grid columns={{ initial: '1', sm: '1', md: '2', lg: '3', xl: '3' }} gap="3">
            {awards.map((data, index) => (
              <ItemAward
                key={index}
                award_name={data.award_name as string}
                award_long_name={data.award_long_name as string}
                award_result={data.award_result as string}
                award_category={data.award_category as string}
                link={(data.link as string) || ''}
                pdf={(data.pdf as string) || ''}
                hasLink={Boolean(data.hasLink)}
                hasAwardCategory={Boolean(data.hasAwardCategory)}
              />
            ))}
          </Grid>
        </Box>
      </Card>
    </Box>
  );
};

export default ItemAwards;
