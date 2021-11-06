import { useRouter } from 'next/router';
import { gql } from '@apollo/client';
import {
  Box,
  Center,
  Text,
  Heading,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import Nav from '../components/Nav';
import ResourceBadge from '../components/ResourceBadge';
import client from '../apollo-client';

const IndexPage = ({ sanity }) => {
  return (
    <Box>
      <Nav />
      <Box mx={50}>
        <Heading as='h2' size='2xl' textAlign='center' pt={5}>
          Community Group Guides and Resources
        </Heading>
        <Heading as='h3' size='xl'>
          Guides
        </Heading>
        <UnorderedList>
          {sanity.guides.map((guide) => (
            <ListItem key={guide._id}>
              <Link
                href={`/guides/${guide.slug.current}`}>{`${guide.sermonDate}: ${guide.sermonTitle}`}</Link>
            </ListItem>
          ))}
        </UnorderedList>
        <Heading>Resources</Heading>
        <UnorderedList>
          {sanity.resources.map((resource) => (
            <ListItem key={resource._id}>
              <Link href={`/resources/${resource.slug.current}`}>
                {resource.title} <ResourceBadge type={resource.type} />
              </Link>
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
    </Box>
  );
};
export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query SANITY {
        allPerson {
          _id
          firstName
          lastName
        }
        allGuide {
          _id
          sermonTitle
          passage
          sermonDate
          cgDate
          slug {
            current
          }
        }
        allLocation {
          _id
          name
        }
        allResource {
          _id
          title
          slug {
            current
          }
          type
          notes
          url
          image {
            asset {
              url
            }
          }
        }
      }
    `,
  });
  return {
    props: {
      sanity: {
        people: data.allPerson,
        locations: data.allLocation,
        guides: data.allGuide,
        resources: data.allResource,
      },
    },
  };
}

export default IndexPage;
