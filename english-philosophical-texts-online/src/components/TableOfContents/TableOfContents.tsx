import type { Author, Text } from "@englishphilosophy/texts";
import title from "../../utils/title.ts";
import url from "../../utils/url.ts";

type Props = {
  text: Author | Text;
};

export default ({ text }: Props) => (
  <div class="table-of-contents">
    {text.children.map((textStub) =>
      textStub.imported
        ? <a key={textStub.id} href={url(textStub)}>{title(textStub)}</a>
        : <span key={textStub.id}>{title(textStub)}</span>
    )}
  </div>
);
