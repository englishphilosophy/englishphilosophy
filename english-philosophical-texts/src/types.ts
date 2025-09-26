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
  ? DataResponse<Index>
  : Path extends `/${string}?query=${string}`
    ? DataResponse<Block[]> | ErrorResponse
  : Path extends `/${string}?regex=${string}`
    ? DataResponse<Block[]> | ErrorResponse
  : Path extends `/${string}/${string}` ? DataResponse<Text> | ErrorResponse
  : Path extends `/${string}` ? DataResponse<Author> | ErrorResponse
  : never;
