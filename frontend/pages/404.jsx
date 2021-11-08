import {
  Box,
  Center,
  Flex,
  Heading,
  Link,
  LinkBox,
  LinkOverlay,
  Text,
} from '@chakra-ui/react';
import Nav from '../components/Nav';
import PageNotFoundButton from '../components/PageNotFoundButton';

const Custom404 = () => {
  const links = [
    { text: 'Home', route: '/' },
    { text: 'Resources', route: '/resources' },
    { text: 'Guides', route: '/guides' },
    { text: 'People', route: '/people' },
  ];
  return (
    <Box height='100vh'>
      <Nav />
      <Heading mt={5} textAlign='center'>
        404 - Page Not Found
      </Heading>
      <Flex
        height={'100vh - 52px'}
        align='center'
        justify='center'
        direction='column'>
        <Center mt={6}>
          <img src='assets/illustrations/knowledge-404.svg' alt='' />
        </Center>
        <Box mt={4} px={{ md: 4, sm: 4 }}>
          <Text>
            The page you clicked may be broken or the page may have been
            removed.
          </Text>
          <Text>
            Please navigate to an already existing page via the menu or the
            buttons below.
          </Text>
        </Box>
        <Flex
          justify='center'
          align='center'
          direction={{ xl: 'row', lg: 'row', md: 'column', sm: 'column' }}
          mt={6}>
          {links.map(({ text, route }) => (
            <PageNotFoundButton text={text} route={route} />
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Custom404;
