import type {
  Block as MarkitBock,
  Markit,
  Stub,
} from "@englishphilosophy/markit";

export type Client = {
  get: <Path extends string>(
    path: Path,
  ) => Promise<{ response: Response; payload: Payload<Path> }>;
};

export type DataResponse<Payload> = {
  data: Payload;
};

export type ErrorResponse = {
  error: string;
};

export type Payload<Path extends string> = Path extends "/"
  ? DataResponse<Healthcheck>
  : Path extends "/texts" ? DataResponse<Index>
  : Path extends `/texts/${string}/${string}`
    ? DataResponse<Text> | ErrorResponse
  : Path extends `/texts/${string}` ? DataResponse<Author> | ErrorResponse
  : Path extends `/search/${string}` ? DataResponse<Block[]> | ErrorResponse
  : never;

export type Healthcheck = {
  status: string;
};

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
  sourceUrl?: string;
  sourceDesc?: string;
};

export type BlockData = {
  pages?: string;
  speaker?: string;
};
