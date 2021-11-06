import { gql } from '@apollo/client';
import { useTable } from 'react-table';
import { Table, Tbody, Thead, Td, Th, Tr } from '@chakra-ui/react';
import client from '../../apollo-client';

const ContactsTable = ({ columns, data, setPerson, onOpen }) => {
  const columnTitles = columns.map((column) => column.accessor);
  const onRowClick = (state, rowInfo, column, instance) => {
    return {
      onClick: (e) => {
        e, column, rowInfo, instance;
      },
    };
  };
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  return (
    <Table {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <Tr
              {...row.getRowProps({
                onClick: async (event) => {
                  const nodes = {};
                  const obj = event.target.parentNode.childNodes.forEach(
                    (node, i) => {
                      nodes[columnTitles[i]] = node.innerText;
                    }
                  );
                  const email = nodes.email;
                  const { data } = await client.query({
                    query: gql`
                      query GET_PERSON_BY_EMAIL($where: PersonFilter) {
                        allPerson(where: $where) {
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
                    `,
                    variables: {
                      where: {
                        email: {
                          eq: email,
                        },
                      },
                    },
                  });
                  setPerson(data.allPerson[0])
                  onOpen();
                },
              })}
              _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}>
              {row.cells.map((cell) => {
                return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>;
              })}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export default ContactsTable;
