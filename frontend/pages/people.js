import * as React from 'react';
import { gql } from '@apollo/client';
import { Box, Center, Heading } from '@chakra-ui/react';
import { useTable } from 'react-table';
import ContactsTable from '../components/ContactsTable';
import Nav from '../components/Nav';
import client from '../apollo-client';

const ContactsPage = ({ sanity }) => {
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
  const tableData = React.useMemo(() => sanity.people.map((person) => person));
  return (
    <Box>
      <Nav />
      <Box mt={5}>
        <Heading textAlign={'center'}>Group Members</Heading>
        <ContactsTable data={tableData} columns={columns} />
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
