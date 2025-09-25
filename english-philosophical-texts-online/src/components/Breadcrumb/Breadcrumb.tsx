import type { Author, TextStub } from "@englishphilosophy/texts";
import url from "../../utils/url.ts";

type Props = {
  ancestors: (Author | TextStub)[];
  previous?: TextStub;
  next?: TextStub;
};

export default ({ ancestors, previous, next }: Props) => (
  <nav class="breadcrumb">
    <div class="trail">
      {ancestors.map((data) => (
        <div class="crumb">
          <a href={url(data)}>
            {"breadcrumb" in data ? data.breadcrumb : data.id}
          </a>
        </div>
      ))}
    </div>
    <div class="context">
      <div class="prev">
        {previous && previous.imported
          ? (
            <a href={url(previous)}>
              &lt; {previous.breadcrumb ?? previous.id}
            </a>
          )
          : null}
      </div>
      <div class="next">
        {next && next.imported
          ? <a href={url(next)}>{next.breadcrumb ?? next.id} &gt;</a>
          : null}
      </div>
    </div>
    <div class="tools">
      {ancestors.length > 1
        ? (
          <a href="#about-modal" data-modal="about-modal">
            Details
          </a>
        )
        : null}
      <a href="#search-modal" data-modal="search-modal">
        Search
      </a>
    </div>
  </nav>
);
