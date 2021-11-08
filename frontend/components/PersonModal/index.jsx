import {
  Center,
  Heading,
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
import urlFor from '../../utils/urlFor';
import formatPhoneNumber from '../../utils/formatPhoneNumber';

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
          <Center mt={3}>
            <img
              style={{ borderRadius: '50%' }}
              src={urlFor(person.photo).width(150).url()}
            />
          </Center>
          <Text mt={3} textAlign='left'>
            Birthday: {person.birthday}
          </Text>
          <Text>
            Phone:{' '}
            <Link href={`tel:${person.phone}`} isExternal>
              {formatPhoneNumber(person.phone)}
            </Link>
          </Text>
          <Text>Email: {person.email}</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PersonModal;
