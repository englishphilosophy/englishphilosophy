import About, { type AboutPage, pages } from "../components/About/About.tsx";
import Page from "../components/Page/Page.tsx";
import SubHeader from "../components/SubHeader/SubHeader.tsx";

type Props = {
  page: AboutPage;
};

export default ({ page }: Props) => (
  <Page
    title="About"
    section="about"
    heading={
      <SubHeader>
        <h1>About: {pages[page]}</h1>
      </SubHeader>
    }
  >
    <About page={page} />
  </Page>
);
