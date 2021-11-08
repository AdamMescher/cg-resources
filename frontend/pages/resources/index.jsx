import { gql } from '@apollo/client';
import {
  Box,
  Center,
  Heading,
  LinkOverlay,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import Select from 'react-select';
import Nav from '../../components/Nav';
import ResourceBadge from '../../components/ResourceBadge';
import client from '../../apollo-client';
import urlFor from '../../utils/urlFor';

const ResourcesPage = ({ resources }) => {
  return (
    <Box>
      <Nav />
      <Box>
        <Center mt={3}>
          <Heading>Resources</Heading>
        </Center>
        <Center width={700} backgroundColor='teal'>
          <Select
            styles={() => ({ width: '500px', backgroundColor: 'red' })}
            isClearable
          />
        </Center>
        <Center>
          <SimpleGrid pt={5} columns={4} spacing={10}>
            {resources.map((resource) => (
              <Box
                width={400}
                height={300}
                borderWidth={2}
                borderColor={'gray.300'}
                borderRadius={10}
                background='gray.100'
                key={resource._id}
                href={`/resources/${resource.slug.current}`}>
                <Center>
                  <img
                    style={{ borderRadius: 10 }}
                    src={urlFor(resource.image).height(150).url()}
                  />
                </Center>
                <Heading px={3} mt={3} fontSize={20} textAlign='center'>
                  {resource.title}
                </Heading>
                <Center px={3} mt={3} pb={2}>
                  <ResourceBadge type={resource.type} />
                </Center>
              </Box>
            ))}
          </SimpleGrid>
        </Center>
      </Box>
    </Box>
  );
};

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query QUERY {
        allResource {
          _id
          title
          slug {
            current
          }
          type
          url
          notes
          image {
            asset {
              url
            }
            hotspot {
              x
              height
              y
              width
            }
            crop {
              bottom
              top
              left
              right
            }
          }
          isbn
        }
      }
    `,
  });
  return {
    props: {
      resources: data.allResource,
    },
  };
}

export default ResourcesPage;
