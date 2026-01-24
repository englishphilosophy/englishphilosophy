import type { VNode } from "preact";
import { Footer, Header, Main } from "@englishphilosophy/style";

type Props = {
  section?: "texts" | "about";
  children: VNode | VNode[];
};

export default ({ section, children }: Props) => {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="Content-Type|" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="english, philosophy, texts, hume" />
        <meta
          name="description"
          content="High-quality digital editions of the collected works of David Hume."
        />
        <title>Hume Texts Online</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/screen.css" />
        <script defer src="/index.js"></script>
      </head>
      <body>
        <Header
          title="Hume Texts Online"
          subtitle="A free online library of the complete works of David Hume"
          siteLinks={[
            { text: "Texts", href: "/", active: section === "texts" },
            { text: "About", href: "/about", active: section === "about" },
          ]}
        />
        <Main>{children}</Main>
        <Footer site="Hume Texts Online" />
      </body>
    </html>
  );
};
