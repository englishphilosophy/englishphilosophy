import response from "../utils/response.ts";
import Error from "../pages/Error.tsx";

export default (message?: string) => {
  const content = (
    <Error message={message ?? "Oops, something unexpected went wrong."} />
  );
  return response(content, 500);
};
