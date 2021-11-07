import { Tag, TagLabel, TagRightIcon } from '@chakra-ui/react';
import { FaChurch } from 'react-icons/Fa';

const SermonSeriesTag = ({ series }) => {
  let colorScheme;
  return (
    <Tag>
      <TagLabel>{series}</TagLabel>
      <TagRightIcon as={FaChurch} />
    </Tag>
  );
};

export default SermonSeriesTag;
