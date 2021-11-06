import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";
import guide from "./guide";
import person from "./person";
import location from "./location";
import resource from './resource';

export default createSchema({
  name: "default",
  types: schemaTypes.concat([guide, person, location, resource]),
});
