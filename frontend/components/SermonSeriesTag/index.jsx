import {
  Tag,
  TagLabel,
  TagRightIcon,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FaChurch } from 'react-icons/fa';

const SermonSeriesTag = ({ tag }) => {
  const breakpoint = useBreakpointValue({
    xl: 'xl',
    lg: 'lg',
    md: 'md',
    sm: 'sm',
  });
  let backgroundColor;
  let color;
  let shortTag;

  if (tag === 'The Apostles Creed') {
    backgroundColor = '#09283B';
    color = 'white';
    shortTag = 'Creed';
  }
  return breakpoint === 'sm' ? (
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
