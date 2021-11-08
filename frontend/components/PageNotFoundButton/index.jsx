import { Heading, LinkBox, LinkOverlay } from '@chakra-ui/react';

const PageNotFoundButton = ({ text, route }) => {
  return (
    <LinkBox
      _hover={{ backgroundColor: '#67592F' }}
      as='article'
      px={4}
      py={2}
      mr={{ xl: 4, lg: 4, md: 0, sm: 0 }}
      mt={{ xl: 0, lg: 0, md: 4, sm: 4 }}
      backgroundColor='#AA934F'
      borderRadius='5px'>
      <LinkOverlay href={route}>
        <Heading color='white'>{text}</Heading>
      </LinkOverlay>
    </LinkBox>
  );
};

export default PageNotFoundButton;
