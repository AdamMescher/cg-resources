import {
  Center,
  Heading,
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

const PersonModal = ({ isOpen, onOpen, onClose, person }) => {
  console.log({ personInModal: person });
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent py={4}>
        <ModalCloseButton />
        <ModalBody>
          <Heading textAlign='center'>
            {person.firstName + ' ' + person.lastName}
          </Heading>
          <Center>
            <img
              style={{ borderRadius: '50%' }}
              src={urlFor(person.photo).width(150).url()}
            />
          </Center>
          <Text textAlign='leftß'>Birthday: {person.birthday}</Text>
          <Text>
            Phone:{' '}<a href={`tel:${person.phone}`}>{person.phone}</a>
          </Text>
          <Text>
            Email:{' '}<a href={`mailto:${person.email}`}>{person.email}</a>
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PersonModal;
