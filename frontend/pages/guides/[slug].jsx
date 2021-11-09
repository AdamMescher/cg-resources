import * as React from 'react';
import { gql } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Center,
  Heading,
  Link,
  List,
  ListIcon,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import Nav from '../../components/Nav';
import PassageText from '../../components/PassageText';
import SermonSeriesTag from '../../components/SermonSeriesTag';
import client from '../../apollo-client';
import { IoMdRadioButtonOn } from 'react-icons/io';
import formatDayMonthYear from '../../utils/formateDayMonthYear';

const GuideSlugPage = ({ esv, sanity }) => {
  const headerColor = 'yellow.500';
  const textColor = 'gray.800';
  const bulletIconColor = 'gray.800';
  const headingMarginTop = '20px;';
  return (
    <Box>
      <Nav />
      <Box px={5}>
        <Heading textAlign='center' mt={2}>{`${formatDayMonthYear(
          sanity.guide.sermonDate
        )}: ${sanity.guide.sermonTitle}`}</Heading>
        {sanity.guide.tags ? (
          <Center mt={2}>
            {sanity.guide.tags.map(({ label, value }) => (
              <SermonSeriesTag tag={label} />
            ))}
          </Center>
        ) : null}
        <Accordion mt={4} allowMultiple allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  <Heading>{`Passage - ${sanity.guide.passage}`}</Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <PassageText html={esv.passages[0]} />
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  <Heading>Sermon Notes</Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <ReactMarkdown
                children={sanity.guide.notes}
                remarkPlugins={[remarkGfm]}
              />
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  <Heading>Questions</Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <OrderedList mt={2} spacing={3}>
                {sanity.guide.questions.map((question) => (
                  <ListItem key={uuidv4()}>{question}</ListItem>
                ))}
              </OrderedList>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  <Heading>Announcements</Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <UnorderedList spacing={4}>
                {sanity.guide.announcements.map((announcement) => (
                  <ListItem mt={2} key={uuidv4()} color={textColor}>
                    {announcement}
                  </ListItem>
                ))}
              </UnorderedList>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  <Heading>Message Link</Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <Text>
                <Link href={sanity.guide.message} style={{ color: '#AA934F' }}>
                  {sanity.guide.sermonTitle}
                </Link>
              </Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem isExpanded={true}>
            <h2>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  <Heading>Files</Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <List>
                {sanity.guide?.cgGuide?.asset?.url ? (
                  <ListItem key={sanity.guide._id}>
                    <Link isExternal href={`${sanity.guide.cgGuide.asset.url}`}>
                      <Text color='#AA934F'>CG Guide</Text>
                    </Link>
                  </ListItem>
                ) : null}
                {sanity.guide?.mikeGuide?.asset?.url ? (
                  <ListItem key={sanity.guide._id}>
                    <Link
                      isExternal
                      href={`${sanity.guide.mikeGuide.asset.url}`}>
                      <Text color='#AA934F'>Mike's Guide</Text>
                    </Link>
                  </ListItem>
                ) : null}
              </List>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
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
          tags {
            label
            value
          }
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
