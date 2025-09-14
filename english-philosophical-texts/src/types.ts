import type { Author, Block, Index, Text } from "@englishphilosophy/texts";

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
