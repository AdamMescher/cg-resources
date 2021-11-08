import * as React from 'react';
import { gql } from '@apollo/client';
import {
  Box,
  Center,
  Heading,
  Text,
  useDisclosure,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useTable } from 'react-table';
import ContactsTable from '../components/ContactsTable';
import PersonModal from '../components/PersonModal';
import Nav from '../components/Nav';
import client from '../apollo-client';
import formatPhoneNumber from '../utils/formatPhoneNumber';

const ContactsPage = ({ sanity }) => {
  const rawTableData = sanity.people.map((person) => {
    const number = person.phone;
    const newPerson = { ...person, phone: formatPhoneNumber(number) };
    console.log({ newPerson });
    return newPerson;
  });
  console.log(rawTableData);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [person, setPerson] = React.useState(null);
  const breakpoint = useBreakpointValue({
    xl: 'xl',
    lg: 'lg',
    md: 'md',
    sm: 'sm',
  });
  const columns = React.useMemo(() => [
    {
      Header: 'First Name',
      accessor: 'firstName',
    },
    {
      Header: 'Last Name',
      accessor: 'lastName',
    },
    {
      Header: 'Email Address',
      accessor: 'email',
    },
    {
      Header: 'Phone Number',
      accessor: 'phone',
    },
    {
      Header: 'Birthday',
      accessor: 'birthday',
    },
  ]);
  const tableData = React.useMemo(() => rawTableData);
  return (
    <Box>
      <Nav />
      <Box
        mt={5}
        width={{ xl: '80%', lg: '85%', md: '90%', sm: '95%' }}
        ml={{ xl: '10%', lg: '7.5%', md: '5%', sm: '2.5%' }}>
        <Heading mb={4} textAlign={'center'}>
          Group Members
        </Heading>
        {breakpoint === 'xl' || breakpoint === 'lg' || breakpoint === 'md' ? (
          <ContactsTable
            data={tableData}
            columns={columns}
            setPerson={setPerson}
            onOpen={onOpen}
          />
        ) : (
          <div>mobile varient</div>
        )}
        {person ? (
          <PersonModal
            person={person}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
          />
        ) : null}
      </Box>
    </Box>
  );
};

export async function getServerSideProps() {
  const query = gql`
    query GET_ALL_PEOPLE {
      allPerson {
        _id
        firstName
        lastName
        role
        birthday
        phone
        email
        photo {
          asset {
            url
          }
        }
      }
    }
  `;
  const { data } = await client.query({ query });

  return {
    props: {
      sanity: {
        people: data.allPerson,
      },
    },
  };
}

export default ContactsPage;
