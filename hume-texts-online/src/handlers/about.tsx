import response from "../utils/response.ts";
import About from "../pages/About.tsx";

export default () => {
  const content = <About />;
  return response(content);
};
