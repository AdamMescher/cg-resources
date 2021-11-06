import { GrCatalogOption } from 'react-icons/gr';

export default {
  title: 'Resource',
  name: 'resource',
  type: 'document',
  icon: GrCatalogOption,
  fields: [
    {
      title: 'Resource Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200, // will be ignored if slugify is set
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
    },
    {
      title: 'Resource Type',
      name: 'type',
      type: 'string',
      options: {
        list: [
          { title: 'book', value: 'book' },
          { title: 'podcast', value: 'podcast' },
          { title: 'sermon', value: 'sermon' },
          { title: 'article', value: 'article' },
          { title: 'song', value: 'song' },
          { title: 'video', value: 'video' },
        ],
      },
    },
    {
      title: 'Reource Notes',
      name: 'notes',
      type: 'markdown',
    },
    {
      title: 'Resource Link',
      name: 'url',
      type: 'url',
    },
    {
      title: 'ISBN',
      name: 'isbn',
      type: 'number',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image',
      options: { hotspot: true },
    },
  ],
};
