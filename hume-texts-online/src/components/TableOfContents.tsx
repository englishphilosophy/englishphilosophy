import type { Text } from "@englishphilosophy/texts";
import url from "../utils/url.ts";

type Props = {
  text: Text;
};

export default ({ text }: Props) => (
  <div class="table-of-contents">
    {text.children.map((textStub) =>
      textStub.imported
        ? (
          <a
            key={textStub.id}
            href={url(textStub)}
            dangerouslySetInnerHTML={{ __html: textStub.title }}
          />
        )
        : <span key={textStub.id}>{textStub.title}</span>
    )}
  </div>
);
