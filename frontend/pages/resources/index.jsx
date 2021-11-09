import { gql } from '@apollo/client';
import {
  Box,
  Center,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
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
        <Center>
          <SimpleGrid mt={5} columns={4} spacing={5}>
            {resources.map((resource) => (
              <LinkBox
                py={3}
                px={2}
                width={300}
                borderWidth={1}
                borderColor={'gray.100'}
                borderRadius={10}
                _hover={{
                  borderColor: 'gray.200',
                  cursor: 'pointer',
                  boxShadow: 'lg',
                }}
                key={resource._id}
                href={`/resources/${resource.slug.current}`}>
                <Flex
                  align='center'
                  justify='center'
                  direction='column'
                  height='100%'>
                  <Center>
                    <img
                      style={{ borderRadius: 10 }}
                      src={urlFor(resource.image).height(100).url()}
                    />
                  </Center>
                  <LinkOverlay href={`/resources/${resource.slug.current}`}>
                    <Text
                      mt={3}
                      noOfLines={2}
                      fontWeight='bold'
                      textAlign='center'>
                      {resource.title}
                    </Text>
                    {resource.authors.length ? (
                      <Text align='center'>
                        By {resource.authors.join(', ')}
                      </Text>
                    ) : null}
                  </LinkOverlay>
                  <Center px={3} mt={3} pb={2}>
                    {resource.tags
                      ? resource.tags.map(({ label, value }) => (
                          <ResourceBadge key={resource._id} tag={label} />
                        ))
                      : null}
                  </Center>
                </Flex>
              </LinkBox>
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
          authors
          slug {
            current
          }
          tags {
            label
            value
          }
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
