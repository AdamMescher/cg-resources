import { GrCatalog } from "react-icons/gr";

export default {
  title: "Guide",
  name: "guide",
  type: "document",
  icon: GrCatalog,
  fields: [
    {
      title: "Sermon Title",
      name: "sermonTitle",
      type: "string",
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "sermonTitle",
        maxLength: 200, // will be ignored if slugify is set
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
    },
    {
      title: "Sermon Series",
      name: "series",
      type: "string",
    },
    {
      title: "Sermon Date",
      name: "sermonDate",
      type: "date",
    },
    {
      title: "Group Discussion Date",
      name: "cgDate",
      type: "date",
    },
    {
      title: "Passage",
      name: "passage",
      type: "string",
    },
    {
      title: "Sermon Notes",
      name: "notes",
      type: "markdown",
    },
    {
      title: "Questions",
      name: "questions",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      title: "Announcements",
      name: "announcements",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      title: "Mike's guide",
      name: "mikeGuide",
      type: "file",
    },
    {
      title: "CG Guide",
      name: "cgGuide",
      type: "file",
    },
    {
      title: "Message Link",
      name: 'message',
      type: 'url'
    }
  ],
};
