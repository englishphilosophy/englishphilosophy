import type { TextStub } from "@englishphilosophy/texts";
import Page from "../components/Page.tsx";
import url from "../utils/url.ts";

type Props = {
  works: TextStub[];
  editions: TextStub[];
};

export default ({ works, editions }: Props) => (
  <Page section="texts">
    <div class="border border-gray">
      <img src="/banner.png" alt="Front covers of Hume's works" />
    </div>
    <div class="grid gap-4 lg:grid-cols-2">
      <div class="bg-white border border-gray p-4 flex flex-col gap-2">
        <h2 class="text-xl font-bold">Works</h2>
        <ul>
          {works.map((work) => (
            <li key={work.id}>
              <a class="text-primary hover:underline" href={url(work)}>
                {work.title}
                {work.published ? ` (${work.published.join(", ")})` : ""}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div class="bg-white border border-gray p-4 flex flex-col gap-2">
        <h2 class="text-xl font-bold">Editions</h2>
        <ul>
          {editions.map((edition) => (
            <li key={edition.id}>
              <a class="text-primary hover:underline" href={url(edition)}>
                {edition.title}
                {edition.copytext ? ` (${edition.copytext.join(", ")})` : ""}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </Page>
);
