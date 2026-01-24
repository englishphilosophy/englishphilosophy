export default async (path: string) => {
  if (baseUrl === null) {
    throw new Error(
      "Base URL is not set. Please ensure the server is started before making requests.",
    );
  }
  const response = await fetch(`${baseUrl}${path}`);
  const body = await response.text();
  return { response, body };
};

let baseUrl: string | null = null;

export const setBaseUrl = (url: string) => {
  baseUrl = url;
};
