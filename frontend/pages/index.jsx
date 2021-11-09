import { useRouter } from 'next/router';
import { gql } from '@apollo/client';
import {
  Box,
  Center,
  Text,
  Heading,
  HStack,
  UnorderedList,
  List,
  ListItem,
  Link,
} from '@chakra-ui/react';
import Nav from '../components/Nav';
import ResourceBadge from '../components/ResourceBadge';
import SermonSeriesTag from '../components/SermonSeriesTag';
import client from '../apollo-client';

function sortByDate(a, b) {
  if (a.sermonDate < b.sermonDate) {
    return 1;
  }
  if (a.sermonDate > b.sermonDate) {
    return -1;
  }
  return 0;
}

const IndexPage = ({ sanity }) => {
  return (
    <Box>
      <Nav />
      <Box mx={3}>
        <Heading as='h2' size='2xl' textAlign='center' pt={5}>
          Community Group Guides and Resources
        </Heading>
        <Heading as='h3' size='xl' mt={6}>
          Guides
        </Heading>
        <List>
          {sanity.guides.sort(sortByDate).map((guide) => (
            <ListItem mt={2} key={guide._id}>
              <HStack>
                {guide.tags
                  ? guide.tags
                      .sort(sortByDate)
                      .map(({ value, label }) => (
                        <SermonSeriesTag key={guide._id} tag={label} />
                      ))
                  : null}
                <Link ml={1} href={`/guides/${guide.slug.current}`}>
                  <Text
                    noOfLines={
                      1
                    }>{`${guide.sermonDate}: ${guide.sermonTitle}`}</Text>
                </Link>
              </HStack>
            </ListItem>
          ))}
        </List>
        <Heading mt={6}>Resources</Heading>
        <List>
          {sanity.resources.map((resource) => (
            <ListItem key={resource._id} mt={1}>
              <HStack>
                {resource.tags
                  ? resource.tags.map(({ label, value }) => (
                      <ResourceBadge key={resource._id} tag={label} />
                    ))
                  : null}
                <Link href={`/resources/${resource.slug.current}`}>
                  <Text noOfLines={1}>{resource.title}</Text>
                </Link>
              </HStack>
            </ListItem>
          ))}
        </List>
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
          tags {
            label
            value
          }
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
          notes
          url
          tags {
            label
            value
          }
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
