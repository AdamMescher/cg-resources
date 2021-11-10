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
import sortByDate from '../utils/sortByDate';

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
        {sanity.guides ? (
          <List>
            {sanity.guides
              .slice(0, 6)
              .sort(sortByDate)
              .map((guide) => (
                <ListItem mt={2} key={guide._id}>
                  <HStack>
                    {guide.tags
                      ? guide.tags.map(({ value, label }) => (
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
        ) : null}
        <Link href='/guides'>
          <Text mt={3} color='#AA934F'>
            See more guides...
          </Text>
        </Link>
        <Heading mt={6}>Resources</Heading>
        <List>
          {sanity.resources.slice(0, 7).map((resource) => (
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
        <Link href='/resources'>
          <Text mt={3} color='#AA934F'>
            See more resources...
          </Text>
        </Link>
      </Box>
    </Box>
  );
};
export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query SANITY {
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
        }
      }
    `,
  });
  return {
    props: {
      sanity: {
        guides: data.allGuide,
        resources: data.allResource,
      },
    },
  };
}

export default IndexPage;
