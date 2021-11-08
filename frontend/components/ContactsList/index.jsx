import {
  Box,
  Center,
  HStack,
  VStack,
  Icon,
  Link,
  Text,
} from '@chakra-ui/react';
import { EmailIcon, PhoneIcon } from '@chakra-ui/icons';
import { MdCake } from 'react-icons/md';
import personModal from '../PersonModal';
import formatPhoneNumber from '../../utils/formatPhoneNumber';
import urlFor from '../../utils/urlFor';

const ContactsList = ({ people }) => {
  return people.map((person) => (
    <Box key={person._id} mt={3}>
      <Center>
        <HStack>
          <img
            src={urlFor(person.photo).width(200).url()}
            style={{
              objectFit: 'cover',
              borderRadius: '50%',
              height: 60,
              width: 60,
            }}
          />
          <Text
            fontSize={24}
            textAlign='center'>{`${person.firstName} ${person.lastName}`}</Text>
        </HStack>
      </Center>
      <HStack mt={2} ml={10}>
        <PhoneIcon />
        <Link href={`tel:${person.phone}`} isExternal>
          {formatPhoneNumber(person.phone)}
        </Link>
      </HStack>
      <HStack mt={2} ml={10}>
        <EmailIcon />
        <Link href={`mailto:${person.email}`} isExternal>
          {person.email}
        </Link>
      </HStack>
      <HStack mt={2} ml={10}>
        <Icon as={MdCake} />
        <Text>{person.birthday}</Text>
      </HStack>
    </Box>
  ));
};

export default ContactsList;
