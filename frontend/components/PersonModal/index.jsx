import {
  Center,
  Heading,
  HStack,
  VStack,
  Icon,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { EmailIcon, PhoneIcon } from '@chakra-ui/icons';
import { MdCake } from 'react-icons/md';
import urlFor from '../../utils/urlFor';
import formatPhoneNumber from '../../utils/formatPhoneNumber';
import formatDayMonth from '../../utils/formatDayMonth';

const PersonModal = ({ isOpen, onOpen, onClose, person }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent py={4}>
        <ModalCloseButton />
        <ModalBody>
          <Heading textAlign='center'>
            {person.firstName + ' ' + person.lastName}
          </Heading>
          <Center mt={5}>
            <img
              src={urlFor(person.photo).height(250).url()}
              style={{
                objectFit: 'cover',
                borderRadius: '50%',
                height: 150,
                width: 150,
              }}
            />
          </Center>
          <HStack mt={5} px={'25%'}>
            <PhoneIcon />
            <Link href={`tel:${person.phone}`} isExternal>
              <Text>{formatPhoneNumber(person.phone)}</Text>
            </Link>
          </HStack>
          <HStack mt={3} px={'25%'}>
            <EmailIcon />
            <Link href={`mailto:${person.email}`} isExternal>
              <Text>{person.email}</Text>
            </Link>
          </HStack>
          <HStack mt={3} px={'25%'}>
            <Icon as={MdCake} />
            <Text mt={3} textAlign='left'>
              {formatDayMonth(person.birthday)}
            </Text>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PersonModal;
