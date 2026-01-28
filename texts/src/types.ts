import type {
  Block as MarkitBock,
  Markit,
  Stub,
} from "@englishphilosophy/markit";

export type Index = {
  id: "index";
  publisher: "English Philosophical Texts";
  children: Author[];
};

export type Author = Markit<AuthorData, TextData, BlockData>;

export type Text = Markit<TextData, TextData, BlockData> & {
  ancestors: [AuthorStub, ...TextStub[]];
  next?: AuthorStub | TextStub;
  previous?: AuthorStub | TextStub;
};

export type FullText = Text & {
  children: FullText[];
};

export type AuthorStub = Stub<AuthorData>;

export type TextStub = Stub<TextData>;

export type Block = MarkitBock<BlockData>;

export type AuthorData = {
  author: AuthorDetails;
};

export type AuthorDetails = {
  forename: string;
  surname: string;
  title?: string;
  birth: number;
  death: number;
  published: number;
  nationality: string;
  sex: string;
};

export type TextData = {
  imported?: boolean;
  title: string;
  author: AuthorDetails;
  breadcrumb: string;
  published?: number[];
  copytext?: number[];
  edition?: string;
  editions?: string[];
  previousEdition?: string;
  nextEdition?: string;
  sourceUrl?: string;
  sourceDesc?: string;
};

export type BlockData = {
  title?: string;
  subsection?: string;
  pages?: string;
  speaker?: string;
};

export type SearchOptions = TextSearchOptions | RegexSearchOptions;

export type TextSearchOptions = {
  query: string;
  ignorePunctuation: boolean;
  caseInsensitive: boolean;
  wholeWords: boolean;
  variantSpellings: boolean;
};

export type RegexSearchOptions = {
  regex: RegExp;
};
