import { useTable } from 'react-table';
import { Table, Tbody, Thead, Td, Th, Tr } from '@chakra-ui/react';

const ContactsTable = ({ columns, data }) => {
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
              {...row.getRowProps()}
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
