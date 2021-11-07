import { gql } from '@apollo/client';
import {
  Box,
  Center,
  Heading,
  Link,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import Nav from '../../components/Nav';
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
          <UnorderedList listStyle='none'>
            {guides.map((guide) => (
              <ListItem>
                <Link href={`/guides/${guide.slug.current}`}>
                  <Text>{`${guide.sermonDate}: ${guide.sermonTitle}`}</Text>
                </Link>
              </ListItem>
            ))}
          </UnorderedList>
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
          series
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
