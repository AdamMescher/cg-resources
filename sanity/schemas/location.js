import { GrMap } from 'react-icons/gr';

import states from "../utils/states";

export default {
  title: "Location",
  name: "location",
  type: "document",
  icon: GrMap,
  fields: [
    {
      title: "Name",
      name: "name",
      type: "string",
    },
    {
      title: "Host",
      name: "host",
      type: "string",
    },
    {
      title: "Address",
      name: "address",
      type: "string",
    },
    {
      title: "City",
      name: "city",
      type: "string",
    },
    {
      title: "State",
      name: "state",
      type: "string",
      options: {
        list: states.map((state) => ({
          title: state.name,
          value: state.abbreviation,
        })),
      },
    },
    {
      title: "Zip Code",
      name: "zip",
      type: "number",
    },
    {
      title: "Google Maps Link",
      name: "googleMapsLink",
      type: "url",
    },
    {
      title: "Apple Maps Link",
      name: "appleMapsLink",
      type: "url",
    },
  ],
};
