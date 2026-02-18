import React from 'react';

interface CategoryItemAwardProps {
  award_long_name: string;
  award_result: string;
}

const CategoryItemAward: React.FC<CategoryItemAwardProps> = ({ award_long_name, award_result }) => {
  const title = award_long_name + ' ' + award_result;
  return <span className="icon-star" title={title} />;
};

export default CategoryItemAward;
