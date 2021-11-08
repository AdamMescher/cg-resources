import { gql } from '@apollo/client';
import {
  Box,
  Center,
  Heading,
  HStack,
  Link,
  ListItem,
  Text,
  List,
} from '@chakra-ui/react';
import Nav from '../../components/Nav';
import SermonSeriesTag from '../../components/SermonSeriesTag';
import client from '../../apollo-client';

const GuidesPage = ({ guides }) => {
  return (
    <Box>
      <Nav />
      <Box>
        <Center>
          <Heading mt={3}>Guides</Heading>
        </Center>
        <Box>
          <List listStyle='none'>
            {guides.map((guide) => (
              <ListItem>
                <HStack>
                  {guide.tags
                    ? guide.tags.map(({ value, label }) => (
                        <SermonSeriesTag tag={label} />
                      ))
                    : null}
                  <Link mr={2} href={`/guides/${guide.slug.current}`}>
                    <Text
                      noOfLines={
                        1
                      }>{`${guide.sermonDate}: ${guide.sermonTitle}`}</Text>
                  </Link>
                </HStack>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query QUERY {
        allGuide {
          passage
          sermonTitle
          slug {
            current
          }
          tags {
            label
            value
          }
          sermonDate
          cgDate
          notes
          questions
          announcements
          mikeGuide {
            asset {
              url
            }
          }
          cgGuide {
            asset {
              url
            }
          }
          message
        }
      }
    `,
  });
  return {
    props: {
      guides: data.allGuide,
    },
  };
}

export default GuidesPage;
