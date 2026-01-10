import { getIndex } from "@englishphilosophy/texts";
import jsonResponse from "../utils/jsonResponse.ts";

export default async (): Promise<Response> => {
  const index = await getIndex();
  return jsonResponse("data", index);
};
