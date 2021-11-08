import { Box, HStack, Icon, Text } from '@chakra-ui/react';
import { EmailIcon, PhoneIcon } from '@chakra-ui/icons';
import { MdCake } from 'react-icons/md';
import personModal from '../PersonModal';

const ContactsList = ({ people }) => {
  return people.map((person) => (
    <Box key={person._id} mt={3}>
      <Text>{`${person.firstName} ${person.lastName}`}</Text>
      <HStack>
        <PhoneIcon />
        <Text>{person.phone}</Text>
      </HStack>
      <HStack>
        <EmailIcon />
        <Text>{person.email}</Text>
      </HStack>
      <HStack>
        <Icon as={MdCake} />
        <Text>{person.birthday}</Text>
      </HStack>
    </Box>
  ));
};

export default ContactsList;
