import response from "../utils/response.ts";
import Error from "../pages/Error.tsx";

export default () => {
  const content = <Error message="Page not found." />;
  return response(content, 404);
};
