import Corpus from "./Pages/Corpus.tsx";
import General from "./Pages/General.tsx";
import Permissions from "./Pages/Permissions.tsx";
import Principles from "./Pages/Principles.tsx";

type Props = {
  page: AboutPage;
};

export const pages = {
  general: "General Information",
  corpus: "Corpus Details",
  principles: "Editorial Principles",
  permissions: "Permissions",
};

export type AboutPage = keyof typeof pages;

export default ({ page }: Props) => (
  <div class="about">
    <nav class="about-nav">
      {Object.entries(pages).map(([id, title]) => (
        <a href={`/about/${id}`} class={id === page ? "active" : ""}>
          {title}
        </a>
      ))}
    </nav>
    {page === "corpus"
      ? <Corpus />
      : page === "principles"
      ? <Principles />
      : page === "permissions"
      ? <Permissions />
      : <General />}
  </div>
);
