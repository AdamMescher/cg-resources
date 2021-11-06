import { Text } from '@chakra-ui/react';

const Guide = ({ guide }) => {
    const {
        cgDate,
        series,
        sermonTitle,
        sermonDate,
        passage,
        passageTextRaw,
        notesRaw,
        questions,
        announcements,
        video,
        podcast,
        manuscript
    } = guide;
    return (
        <Text fontWeight="bold">{sermonTitle}</Text>
    )
}

export default Guide;