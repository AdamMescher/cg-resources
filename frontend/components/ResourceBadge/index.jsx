import { Badge, Flex } from '@chakra-ui/react';

const ResourceBadge = ({ type }) => {
  let colorScheme;
  if (type === 'article') {
    colorScheme = 'cyan';
  } else if (type === 'book') {
    colorScheme = 'blue';
  } else if (type === 'podcast') {
    colorScheme = 'purple';
  } else if (type === 'sermon') {
    colorScheme = 'orange';
  } else if (type === 'study') {
    colorScheme = 'green';
  } else if (type === 'video') {
    colorScheme = 'red';
  }
  return (
    <Badge bottom='50%' variant='solid' colorScheme={colorScheme}>
      {type}
    </Badge>
  );
};

export default ResourceBadge;
