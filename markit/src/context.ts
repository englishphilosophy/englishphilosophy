import { ensureDir, exists } from "@std/fs";
import { extname } from "@std/path";
import { compileBaseStub } from "./lib/compile.ts";
import type { Stub } from "./types.ts";

export default async (
  directory: string | null,
  clearContextCache: boolean,
): Promise<Stub[]> => {
  // optionally clear the context cache
  if (clearContextCache) {
    await Deno.remove(`${directory}/.cache/context.json`).catch(() => {});
  }

  // if there's no context directory, there's no context
  if (!directory) {
    return [];
  }

  // check if the context directory exists
  const isDir = await exists(directory, { isDirectory: true });
  if (!isDir) {
    throw new Error(`Context directory "${directory}" does not exist`);
  }

  // check if there's a cached context
  if (await exists(`${directory}/.cache/context.json`)) {
    // return the cached context for speed
    return JSON.parse(
      await Deno.readTextFile(`${directory}/.cache/context.json`),
    );
  } else {
    // otherwise read all .mit files in the directory and generate the context
    const mitFiles = await readMitPaths(directory);
    const context = await readContext(mitFiles);
    await ensureDir(`${directory}/.cache`); // ensure the cache directory exists
    await Deno.writeTextFile(
      `${directory}/.cache/context.json`,
      JSON.stringify(context),
    ); // and cache a copy of it for next time
    return context;
  }
};

export const readMitPaths = async (directory: string) => {
  const mitFiles: string[] = [];
  for await (const dirEntry of Deno.readDir(directory)) {
    const fullPath = `${directory}/${dirEntry.name}`;
    if (dirEntry.isDirectory) {
      mitFiles.push(...(await readMitPaths(fullPath)));
    } else if (dirEntry.isFile && extname(fullPath) === ".mit") {
      mitFiles.push(fullPath);
    }
  }
  return mitFiles;
};

export const readContext = (mits: string[]): Promise<Stub[]> =>
  Promise.all(
    mits.map(async (mit) => {
      const content = await Deno.readTextFile(mit);
      return compileBaseStub(content);
    }),
  );
