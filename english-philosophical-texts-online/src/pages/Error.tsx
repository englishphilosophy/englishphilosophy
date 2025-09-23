import Page from "../components/Page/Page.tsx";
import SubHeader from "../components/SubHeader/SubHeader.tsx";

type Props = {
  message: string;
};

export default ({ message }: Props) => (
  <Page
    heading={
      <SubHeader>
        <h1>Error</h1>
      </SubHeader>
    }
    section="texts"
  >
    <p>{message}</p>
  </Page>
);
