import response from "../utils/response.ts";
import About from "../pages/About.tsx";
import type { AboutPage } from "../components/About/About.tsx";

export default (page: AboutPage) => {
  const content = <About page={page} />;
  return response(content);
};
