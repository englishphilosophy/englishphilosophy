import { getIndex } from "@englishphilosophy/texts";
import response from "../utils/response.ts";

export default async (): Promise<Response> => {
  const index = await getIndex();
  return response("data", index);
};
