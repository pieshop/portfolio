import React from "react";
import { Box, Flex, Text } from "@radix-ui/themes";
import { Link } from "react-router";
import CategoryItemImage from "components/CategoryItemImage";

interface Award {
  id: string;
  award_long_name: string;
  award_result: string;
}

interface CategoryItemProps {
  id: string;
  title: string;
  to: string;
  client_label: string;
  entry_id: string;
  client_id: string;
  year: number;
  thumb_path: string;
  is_responsive?: boolean;
  awards?: Award[];
  index?: number;

  [key: string]: unknown;
}

const CategoryItem: React.FC<CategoryItemProps> = (opts) => {
  const { id, title, to, client_label, entry_id, client_id, year, thumb_path, is_responsive, awards } = opts;
  return (
    <Box mb="5">
      <Box style={{ backgroundColor: 'var(--white)', border: '0px solid', boxShadow: 'var(--shadow-2)'}}>
        <article id={id}>
          <Link
            to={to}
            style={{ position: 'relative' }}
            data-entryid={entry_id}
            data-clientid={client_id}
            title={title}
          >
            <CategoryItemImage title={title} thumb_path={thumb_path} is_responsive={is_responsive}/>
            {awards && (
              <Flex gap="1" style={{ position: 'absolute', top: 'var(--space-2)', left: 'var(--space-2)' }}>
                {awards.map((data, index) => {
                  const title = data?.award_long_name + ' ' + data?.award_result;
                  return <Box key={data.id || index} className="icon-star" style={{ cursor: 'var(--cursor-link)', color: 'gold', textShadow: '1px 1px 2px rgba(0,0,0,0.6)' }} title={title} />;
                })}
              </Flex>
            )}
          </Link>

          <Box className="item__decoration">
            <Box className="decoration" style={{ left: 0 }}/>
            <Box className="decoration" style={{ right: 0 }}/>
          </Box>

          <Flex direction="column" align="center" my="5" gap="2">
            <Text size="3" color="gray" weight="bold" truncate align="center" style={{ width: '90%', paddingInline: 'var(--space-3)' }}>
              {title}
            </Text>
            <Text size="2" color="gray" weight="bold" mb="5">
              {client_label} ({year})
            </Text>

          </Flex>
        </article>
      </Box>
    </Box>
  );
};

export default CategoryItem;
