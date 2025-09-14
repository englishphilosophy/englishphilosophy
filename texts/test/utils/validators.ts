import Ajv from "ajv/dist/2020.js";
import { authorSchema, indexSchema, textSchema } from "./schemas.ts";

const ajv = new Ajv.default({
  strictTuples: false, // strict tuples doesn't like `ancestors: [AuthorStub, ...TextStub[]]`
});

export const validateIndex = ajv.compile(indexSchema);

export const validateAuthor = ajv.compile(authorSchema);

export const validateText = ajv.compile(textSchema);
