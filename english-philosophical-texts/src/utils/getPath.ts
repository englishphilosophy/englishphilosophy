import { exists } from "@std/fs";

export default async (id: string): Promise<string | undefined> => {
  const idPath = id.replaceAll(".", "/").toLowerCase();
  if (await exists(`texts/${idPath}.mit`)) return `texts/${idPath}.mit`;
  if (await exists(`texts/${idPath}/index.mit`)) {
    return `texts/${idPath}/index.mit`;
  }
  return undefined;
};
