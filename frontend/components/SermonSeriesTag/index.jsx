import { Tag, TagLabel, TagRightIcon } from '@chakra-ui/react';
import { FaChurch } from 'react-icons/fa';

const SermonSeriesTag = ({ tag }) => {
  let backgroundColor;
  let color;
  if (tag === 'The Apostles Creed') {
    backgroundColor = '#09283B';
    color = 'white';
  }
  return (
    <Tag color={color} backgroundColor={backgroundColor}>
      <TagLabel color={color}>{tag}</TagLabel>
      <TagRightIcon as={FaChurch} />
    </Tag>
  );
};

export default SermonSeriesTag;
