import getIndex from "../utils/getIndex.ts";
import response from "../utils/response.ts";

export default async (): Promise<Response> => {
  const index = await getIndex();
  return response("data", index);
};
