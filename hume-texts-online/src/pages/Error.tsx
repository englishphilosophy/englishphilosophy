import Page from "../components/Page.tsx";

type Props = {
  message: string;
};

export default ({ message }: Props) => (
  <Page>
    <h1>Error</h1>
    <p>{message}</p>
  </Page>
);
