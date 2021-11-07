import * as React from 'react';
import { gql } from '@apollo/client';
import {
  Box,
  Heading,
  Link,
  ListIcon,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import Nav from '../../components/Nav';
import PassageText from '../../components/PassageText';
import { IoMdRadioButtonOn } from 'react-icons/io';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { v4 as uuidv4 } from 'uuid';
import client from '../../apollo-client';

const headerColor = 'yellow.500';
const textColor = 'gray.800';
const bulletIconColor = 'gray.800';
const headingMarginTop = '20px;';

const GuideSlugPage = ({ esv, sanity }) => {
  return (
    <Box>
      <Nav />
      <Box px={50}>
        <Heading
          textAlign='center'
          mt={
            2
          }>{`${sanity.guide.sermonDate}: ${sanity.guide.sermonTitle} | ${sanity.guide.passage}`}</Heading>
        <Box>
          <Heading>Passage</Heading>
          <PassageText html={esv.passages[0]} />
          <Heading pt={headingMarginTop} as='h3' size='lg'>
            Sermon Notes
          </Heading>
          <ReactMarkdown
            children={sanity.guide.notes}
            remarkPlugins={[remarkGfm]}
          />
          <Heading pt={headingMarginTop} as='h3' size='lg'>
            Questions
          </Heading>
          <OrderedList mt={2} spacing={3}>
            {sanity.guide.questions.map((question) => (
              <ListItem key={uuidv4()}>{question}</ListItem>
            ))}
          </OrderedList>
          <Heading pt={headingMarginTop} as='h3' size='lg'>
            Announcemnts
          </Heading>
          <UnorderedList spacing={4}>
            {sanity.guide.announcements.map((announcement) => (
              <ListItem
                mt={2}
                key={uuidv4()}
                color={textColor}
                style={{ listStyle: 'none' }}>
                <ListIcon
                  as={IoMdRadioButtonOn}
                  key={announcement._id}
                  fill={bulletIconColor}
                />
                {announcement}
              </ListItem>
            ))}
          </UnorderedList>
          <Heading pt={headingMarginTop} as='h3' size='lg' marginTop>
            Message Link
          </Heading>
          <Text>
            <Link href={sanity.guide.message} style={{ color: '#AA934F' }}>
              {sanity.guide.sermonTitle}
            </Link>
          </Text>
          <Heading>Files</Heading>
          <Link isExternal href={`${sanity.guide.mikeGuide.asset.url}`}>
            Mike's Guide
          </Link>
          <Link isExternal href={`${sanity.guide.cgGuide.asset.url}`}>
            Prayer Guide
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export async function getServerSideProps({ query }) {
  const { data, error } = await client.query({
    query: gql`
      query RootQuery($allGuideWhere: GuideFilter) {
        allGuide(where: $allGuideWhere) {
          _id
          sermonTitle
          sermonDate
          cgDate
          passage
          notes
          questions
          announcements
          message
          mikeGuide {
            asset {
              _id
              url
            }
          }
          cgGuide {
            asset {
              _id
              url
            }
          }
        }
      }
    `,
    variables: {
      allGuideWhere: {
        slug: {
          current: {
            eq: query.slug,
          },
        },
      },
    },
  });
  if (error) {
    console.log({ error });
  }
  const getPassageText = async () => {
    if (!String.prototype.replaceAll) {
      String.prototype.replaceAll = function (str, newStr) {
        // If a regex pattern
        if (
          Object.prototype.toString.call(str).toLowerCase() ===
          '[object regexp]'
        ) {
          return this.replace(str, newStr);
        }

        // If a string
        return this.replace(new RegExp(str, 'g'), newStr);
      };
    }
    const passageText = await fetch(
      `https://api.esv.org/v3/passage/html?q=${data.allGuide[0].passage.replaceAll(
        ' ',
        ''
      )}&include-footnotes=false&include-audio-link=false`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Token 710392c94e40886957768a5e10ba506a48d4f138',
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => response.text())
      .then((data) => JSON.parse(data))
      .catch((err) => console.error(err));
    return passageText;
  };
  const esv = await getPassageText();

  return {
    props: {
      esv,
      sanity: {
        guide: data.allGuide[0],
      },
    },
  };
}

export default GuideSlugPage;
