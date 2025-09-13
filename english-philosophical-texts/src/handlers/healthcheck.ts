import response from "../utils/response.ts";

export default (): Response => {
  const message = { status: "ok" };
  return response("data", message);
};
