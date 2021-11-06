import parse, { domToReact } from 'html-react-parser';
import { Box } from '@chakra-ui/react';
import Copyright from '../Copyright';

const PassageText = ({ html }) => {
  const text = parse(html);
  return (
    <Box>
      <div>
        {parse(html, {
          replace: ({ attribs, children, name }) => {
            if (name === 'h2') {
              return (
                <h2
                  className='extra_text'
                  style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
                  {domToReact(children)}
                </h2>
              );
            }
            if (name === 'h3') {
              return (
                <h3 style={{ fontWeight: 'bold' }}>{domToReact(children)}</h3>
              );
            }
            if (name === 'b') {
              return <sup>{domToReact(children)}</sup>;
            }
          },
        })}
      </div>
      <br />
      <Copyright />
    </Box>
  );
};

export default PassageText;
