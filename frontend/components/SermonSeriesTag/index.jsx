import { Tag, TagLabel, TagRightIcon } from '@chakra-ui/react';
import { FaChurch } from 'react-icons/Fa';

const SermonSeriesTag = ({ tag }) => {
  let colorScheme;
  return (
    <Tag>
      <TagLabel>{tag}</TagLabel>
      <TagRightIcon as={FaChurch} />
    </Tag>
  );
};

export default SermonSeriesTag;
