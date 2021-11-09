import { useRouter } from 'next/router';
import { gql } from '@apollo/client';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Badge, Box, Center, Heading, Link, Text } from '@chakra-ui/react';
import Nav from '../../components/Nav';
import ResourceBadge from '../../components/ResourceBadge';
import client from '../../apollo-client';
import urlFor from '../../utils/urlFor';

const ResourceSlugPage = ({ resource }) => {
  return (
    <Box>
      <Nav />
      <Box px={50}>
        <Heading mt={25} textAlign={'center'}>
          {resource.title}
        </Heading>
        {resource.authors.length ? (
          <Text fontSize={18} align='center'>By {resource.authors.join(', ')}</Text>
        ) : null}
        <Center mt={2}>
          {resource.tags
            ? resource.tags.map(({ label, value }) => (
                <ResourceBadge key={resource._id} tag={label} />
              ))
            : null}
        </Center>
        <Center mt={4}>
          <img
            style={{ borderRadius: '8px' }}
            src={urlFor(resource.image).width(250).url()}
          />
        </Center>
        <Center>
          <Heading mt={6}>Link</Heading>
        </Center>
        <Center>
          <Link
            href={resource.url}
            isExternal
            colorScheme='cyan'
            textDecoration='none'>
            <Text
              color='#AA934F'
              _hover={{ color: 'yellow.500', textDecoration: 'cyan.500' }}>
              {resource.title}
            </Text>
          </Link>
        </Center>
        <Center>
          <Heading mt={6}>Description</Heading>
        </Center>
        <Box width='70%' textAlign='left' mx='15%'>
          <ReactMarkdown
            children={resource.notes}
            remarkPlugins={[remarkGfm]}
          />
        </Box>
        {resource.isbn ? (
          <Box ml='15%'>
            <Text
              mt={2}>{`ISBN-${resource.isbn.length}: ${resource.isbn}`}</Text>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export async function getServerSideProps({ query }) {
  const gqlQuery = gql`
    query GET_RESOURCE_BY_SLUG($where: ResourceFilter) {
      allResource(where: $where) {
        _id
        _updatedAt
        _createdAt
        title
        authors
        slug {
          current
        }
        tags {
          label
          value
        }
        notes
        url
        isbn
        image {
          hotspot {
            x
            y
            height
            width
          }
          crop {
            top
            bottom
            left
            right
          }
          asset {
            url
          }
        }
      }
    }
  `;
  const variables = {
    where: {
      slug: {
        current: {
          eq: query.slug,
        },
      },
    },
  };
  const { data } = await client.query({ query: gqlQuery, variables });
  return { props: { resource: data.allResource[0] } };
}

export default ResourceSlugPage;
