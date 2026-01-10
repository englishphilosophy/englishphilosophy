import type {
  Author,
  Block,
  FullText,
  Index,
  Text,
} from "@englishphilosophy/texts";
import type { Format } from "@englishphilosophy/markit";

export type TextOptions = {
  format: Format;
  normalized: boolean;
  full: boolean;
  flat: boolean;
};

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
  : Path extends `/${string}/${string}?${string}flat${string}`
    ? string | ErrorResponse
  : Path extends `/${string}/${string}?${string}full${string}`
    ? DataResponse<FullText> | ErrorResponse
  : Path extends `/${string}/${string}` ? DataResponse<Text> | ErrorResponse
  : Path extends `/${string}` ? DataResponse<Author> | ErrorResponse
  : never;
