import { getIndex } from "@englishphilosophy/texts";
import response from "../utils/response.ts";
import Index from "../pages/Index.tsx";

export default async (searchParams: URLSearchParams) => {
  const index = await getIndex();
  const query = searchParams.get("query") ?? undefined;
  const order = searchParams.get("order") ?? undefined;
  const content = <Index index={index} query={query} order={order} />;
  return response(content);
};
