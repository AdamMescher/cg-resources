import { GrUser } from 'react-icons/gr';

export default {
  title: "Person",
  name: "person",
  type: "document",
  icon: GrUser,
  fields: [
    {
      title: "First Name",
      name: "firstName",
      type: "string",
    },
    {
      title: "Last Name",
      name: "lastName",
      type: "string",
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
      title: "Role",
      name: "role",
      type: "string",
      options: {
        list: [
          { title: "Leader", value: "leader" },
          { title: "Member", value: "member" },
        ],
        layout: 'radio'
      },
    },
    {
      title: "Birthday",
      name: "birthday",
      type: "date",
    },
    {
      title: "Phone Number",
      name: "phone",
      type: "string",
    },
    {
      title: "Email Address",
      name: 'email',
      type: 'email'
    },
    {
      title: "Photo",
      name: "photo",
      type: "image",
      options: { hotspot: true },
    },
  ],
};
