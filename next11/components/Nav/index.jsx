import {
  Breadcrumb,
  Box,
  Center,
  Heading,
  HStack,
  Link,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';

const Nav = () => {
  return (
    <Box py={3} width={'100%'} backgroundColor='#AA934F' textAlign='center'>
      <Center>
        <HStack>
          <Link href='/'>
            <Text fontSize='1.2em' color='white'>
              Home
            </Text>
          </Link>
          <Link href='/resources'>
            <Text fontSize='1.2em' color='white' ml={5} mr={5}>
              Resources
            </Text>
          </Link>
          <Link href='/guides'>
            <Text fontSize='1.2em' color='white' mr={5}>
              Guides
            </Text>
          </Link>
          <Link href='/people'>
            <Text fontSize='1.2em' color='white'>
              People
            </Text>
          </Link>
        </HStack>
      </Center>
    </Box>
  );
};

export default Nav;
