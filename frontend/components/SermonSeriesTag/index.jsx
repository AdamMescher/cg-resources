import { Tag, TagLabel, TagRightIcon, useMediaQuery } from '@chakra-ui/react';
import { FaChurch } from 'react-icons/fa';
import { RiCloudFill, RiVipCrownFill } from 'react-icons/ri';

const SermonSeriesTag = ({ tag }) => {
  let backgroundColor;
  let color;
  let icon;
  let shortTag;
  const [isSmallerThan30Em] = useMediaQuery('(max-width: 30em)');

  if (tag === 'The Apostles Creed') {
    backgroundColor = '#09283B';
    color = 'white';
    shortTag = 'Creed';
    icon = FaChurch;
  }
  if (tag === 'Invisibilia') {
    backgroundColor = '#627E81';
    color = 'white';
    shortTag = 'Invisibilia';
    icon = RiCloudFill;
  }
  if (tag === 'Mark') {
    backgroundColor = 'blue.400';
    color = 'white';
    shortTag = 'Mark';
    icon = RiVipCrownFill;
  }

  return isSmallerThan30Em ? (
    <Tag color={color} backgroundColor={backgroundColor}>
      <TagLabel color={color}>{shortTag}</TagLabel>
      <TagRightIcon as={icon} />
    </Tag>
  ) : (
    <Tag color={color} backgroundColor={backgroundColor}>
      <TagLabel color={color}>{tag}</TagLabel>
      <TagRightIcon as={icon} />
    </Tag>
  );
};

export default SermonSeriesTag;
