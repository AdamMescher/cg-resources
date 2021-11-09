import {
  Tag,
  TagLabel,
  TagRightIcon,
  useMediaQuery,
} from '@chakra-ui/react';
import { FaChurch } from 'react-icons/fa';

const SermonSeriesTag = ({ tag }) => {
  let backgroundColor;
  let color;
  let shortTag;

  if (tag === 'The Apostles Creed') {
    backgroundColor = '#09283B';
    color = 'white';
    shortTag = 'Creed';
  }
  const [isSmallerThan1280] = useMediaQuery('(max-width: 30em)');
  return isSmallerThan1280 ? (
    <Tag color={color} backgroundColor={backgroundColor}>
      <TagLabel color={color}>{shortTag}</TagLabel>
      <TagRightIcon as={FaChurch} />
    </Tag>
  ) : (
    <Tag color={color} backgroundColor={backgroundColor}>
      <TagLabel color={color}>{tag}</TagLabel>
      <TagRightIcon as={FaChurch} />
    </Tag>
  );
};

export default SermonSeriesTag;
