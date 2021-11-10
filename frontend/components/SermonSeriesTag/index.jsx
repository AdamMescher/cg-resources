import { Tag, TagLabel, TagRightIcon, useMediaQuery } from '@chakra-ui/react';
import { FaChurch } from 'react-icons/fa';
import { RiCloudFill, RiVipCrownFill } from 'react-icons/ri';

const SermonSeriesTag = ({ tag }) => {
  let text;
  let shortText;
  let backgroundColor;
  let color;
  let icon;
  const [isSmallerThan30Em] = useMediaQuery('(max-width: 30em)');

  if (tag === 'The Apostles Creed') {
    backgroundColor = '#09283B';
    color = 'white';
    icon = FaChurch;
    text = 'The Apostles Creed';
    shortText = 'Creed';
  }
  if (tag === 'Invisibilia') {
    backgroundColor = '#627E81';
    color = 'white';
    icon = RiCloudFill;
    text = 'Invisibilia';
    shortText = 'Invisibilia';
  }
  if (tag === 'Mark 2021') {
    backgroundColor = 'blue.400';
    color = 'white';
    icon = RiVipCrownFill;
    text = 'Mark';
    shortText = 'Mark';
  }

  return isSmallerThan30Em ? (
    <Tag color={color} backgroundColor={backgroundColor}>
      <TagLabel color={color}>{shortText}</TagLabel>
      <TagRightIcon as={icon} />
    </Tag>
  ) : (
    <Tag color={color} backgroundColor={backgroundColor}>
      <TagLabel color={color}>{text}</TagLabel>
      <TagRightIcon as={icon} />
    </Tag>
  );
};

export default SermonSeriesTag;
