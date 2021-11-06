import * as React from 'react';
import { gql } from '@apollo/client';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Td,
  Th,
  Tr,
} from '@chakra-ui/react';
import { useTable } from 'react-table';
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
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: tableData });
  return (
    <Box>
      <Nav />
      <Box mt={5}>
        <Heading textAlign={'center'}>Group Members</Heading>
        <Box width='70%' mx='15%' mt={3}>
          <Table {...getTableProps()}>
            <Thead>
              {headerGroups.map((headerGroup) => (
                <Tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <Th {...column.getHeaderProps()}>
                      {column.render('Header')}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <TBody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <Tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                      );
                    })}
                  </Tr>
                );
              })}
            </TBody>
          </Table>
        </Box>
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
