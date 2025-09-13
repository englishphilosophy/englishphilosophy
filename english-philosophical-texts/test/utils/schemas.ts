import type { JSONSchemaType } from "ajv/dist/2020.js";
import type {
  Author,
  AuthorDetails,
  AuthorStub,
  Block,
  Index,
  Text,
  TextStub,
} from "../../src/types.ts";

export const blockSchema: JSONSchemaType<Block> = {
  type: "object",
  properties: {
    id: { type: "string" },
    type: { type: "string", enum: ["title", "paragraph", "note"] },
    text: { type: "string" },
    pages: { type: "string", nullable: true },
    speaker: { type: "string", nullable: true },
  },
  required: ["id", "type", "text"],
  additionalProperties: false,
};

export const authorDetailsSchema: JSONSchemaType<AuthorDetails> = {
  type: "object",
  properties: {
    forename: { type: "string" },
    surname: { type: "string" },
    title: { type: "string", nullable: true },
    birth: { type: "number" },
    death: { type: "number" },
    published: { type: "number" },
    nationality: { type: "string" },
    sex: { type: "string" },
  },
  required: [
    "forename",
    "surname",
    "birth",
    "death",
    "published",
    "nationality",
    "sex",
  ],
  additionalProperties: false,
};

export const textStubSchema: JSONSchemaType<TextStub> = {
  type: "object",
  properties: {
    id: { type: "string" },
    imported: { type: "boolean", nullable: true },
    title: { type: "string" },
    author: authorDetailsSchema,
    breadcrumb: { type: "string" },
    published: { type: "array", items: { type: "number" }, nullable: true },
    copytext: { type: "array", items: { type: "number" }, nullable: true },
    sourceUrl: { type: "string", nullable: true },
    sourceDesc: { type: "string", nullable: true },
  },
  required: ["id", "title", "breadcrumb"],
  additionalProperties: false,
};

export const authorStubSchema: JSONSchemaType<AuthorStub> = {
  type: "object",
  properties: {
    id: { type: "string" },
    author: authorDetailsSchema,
  },
  required: ["id", "author"],
  additionalProperties: false,
};

export const authorSchema: JSONSchemaType<Author> = {
  type: "object",
  properties: {
    id: { type: "string" },
    author: authorDetailsSchema,
    children: { type: "array", items: textStubSchema },
    blocks: { type: "array", items: blockSchema },
    ancestors: { type: "array", items: textStubSchema },
    next: { ...textStubSchema, nullable: true },
    previous: { ...textStubSchema, nullable: true },
  },
  required: ["id", "author", "children", "blocks", "ancestors"],
  additionalProperties: false,
};

// @ts-expect-error: Type error apparently due to ajv types limitation
export const textSchema: JSONSchemaType<Text> = {
  type: "object",
  properties: {
    id: { type: "string" },
    imported: { type: "boolean", nullable: true },
    title: { type: "string" },
    breadcrumb: { type: "string" },
    published: { type: "array", items: { type: "number" }, nullable: true },
    copytext: { type: "array", items: { type: "number" }, nullable: true },
    sourceUrl: { type: "string", nullable: true },
    sourceDesc: { type: "string", nullable: true },
    author: authorDetailsSchema,
    children: { type: "array", items: textStubSchema },
    ancestors: {
      type: "array",
      minItems: 1,
      prefixItems: [authorStubSchema],
      items: textStubSchema,
    },
    previous: {
      type: "object",
      oneOf: [authorStubSchema, textStubSchema],
      nullable: true,
    },
    next: { ...textStubSchema, nullable: true },
    blocks: { type: "array", items: blockSchema },
  },
  required: [
    "id",
    "title",
    "breadcrumb",
    "author",
    "ancestors",
    "children",
    "blocks",
  ],
  additionalProperties: false,
};

export const indexSchema: JSONSchemaType<Index> = {
  type: "object",
  properties: {
    id: { type: "string" },
    publisher: { type: "string" },
    children: { type: "array", items: authorSchema },
  },
  required: ["id", "publisher", "children"],
  additionalProperties: false,
};
