import { gql } from '@apollo/client';
import { Box, Center, Heading, Link, Text } from '@chakra-ui/react';
import Nav from '../../components/Nav';
import client from '../../apollo-client';

const ResourcesPage = ({ resources }) => {
  return (
    <Box>
      <Nav />
      <Box>
        <Center mt={3}>
          <Heading>Resources</Heading>
        </Center>
        {resources.map((resource) => (
          <Link key={resource._id} href={`/resources/${resource.slug.current}`}>
            <Text>{resource.title}</Text>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query QUERY {
        allResource {
          title
          slug {
            current
          }
          type
          url
          notes
          image {
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
