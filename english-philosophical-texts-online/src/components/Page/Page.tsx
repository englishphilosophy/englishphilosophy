import type { VNode } from "preact";
import Footer from "../Footer/Footer.tsx";
import Header from "../Header/Header.tsx";

type Props = {
  title?: string;
  section?: string;
  heading: VNode;
  children: VNode | VNode[];
};

export default ({ title, section, heading, children }: Props) => {
  const displayTitle = title
    ? `${title} - English Philosophical Texts Online`
    : "English Philosophical Texts Online";

  return (
    <html lang="en">
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="Content-Type|" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="english, philosophy, texts, hobbes, locke, hume, mill, shaftesbury"
        />
        <meta
          name="description"
          content="High-quality digital editions of a broad canon of English philosophical texts published between 1650 and 1830."
        />
        <title>{displayTitle}</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/screen.css" />
        <script defer src="/index.js"></script>
      </head>
      <body>
        <Header section={section} />
        {heading}
        <main class="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
};
