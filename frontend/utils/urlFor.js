import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const sanity = sanityClient({
  projectId: 's6hca5j1',
  dataset: 'production',
  apiVersion: '2021-11-05',
  useCdn: true,
});
const builder = imageUrlBuilder(sanity);

function urlFor(source) {
  return builder.image(source);
}

export default urlFor;
