import { Badge, Flex } from '@chakra-ui/react';

const ResourceBadge = ({ tag }) => {
  let colorScheme;
  if (tag === 'article') {
    colorScheme = 'cyan';
  } else if (tag === 'book') {
    colorScheme = 'blue';
  } else if (tag === 'podcast') {
    colorScheme = 'purple';
  } else if (tag === 'sermon') {
    colorScheme = 'orange';
  } else if (tag === 'study') {
    colorScheme = 'green';
  } else if (tag === 'video') {
    colorScheme = 'red';
  }
  return (
    <Badge bottom='50%' variant='solid' colorScheme={colorScheme}>
      {tag}
    </Badge>
  );
};

export default ResourceBadge;
