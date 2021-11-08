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

const ContactsList = ({ people }) => {
  return people.map((person) => (
    <Box key={person._id} mt={3}>
      <Text
        fontSize={24}
        textAlign='center'>{`${person.firstName} ${person.lastName}`}</Text>
      <HStack ml={10}>
        <PhoneIcon />
        <Link href={`tel:${person.phone}`} isExternal>
          {formatPhoneNumber(person.phone)}
        </Link>
      </HStack>
      <HStack ml={10}>
        <EmailIcon />
        <Link href={`mailto:${person.email}`} isExternal>
          {person.email}
        </Link>
      </HStack>
      <HStack ml={10}>
        <Icon as={MdCake} />
        <Text>{person.birthday}</Text>
      </HStack>
    </Box>
  ));
};

export default ContactsList;
