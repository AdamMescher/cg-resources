import { Heading, LinkBox, LinkOverlay, useMediaQuery } from '@chakra-ui/react';

const PageNotFoundButton = ({ text, route }) => {
  const [isSmallerThan30Em] = useMediaQuery('(max-width: 30em)');
  return (
    <LinkBox
      _hover={{ backgroundColor: '#67592F' }}
      as='article'
      px={4}
      py={2}
      mr={{ xl: 4, lg: 4, md: 0, sm: 0 }}
      mt={isSmallerThan30Em ? 3 : 0}
      backgroundColor='#AA934F'
      borderRadius='5px'>
      <LinkOverlay href={route}>
        <Heading color='white'>{text}</Heading>
      </LinkOverlay>
    </LinkBox>
  );
};

export default PageNotFoundButton;
