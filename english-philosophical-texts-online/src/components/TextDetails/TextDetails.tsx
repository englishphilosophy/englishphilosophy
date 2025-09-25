import type { Text } from "@englishphilosophy/texts";
import fullname from "../../utils/fullname.ts";

type Props = {
  text: Text;
};

export default ({ text }: Props) => (
  <div class="text-details">
    <h4>{fullname(text.author)}</h4>
    {text.published ? (
      <p>
        <strong>Published:</strong> {text.published.join(", ")}
      </p>
    ) : null}
    {text.copytext ? (
      <p>
        <strong>Copytext:</strong> {text.copytext.join(", ")}
      </p>
    ) : null}
    {text.sourceUrl ? (
      <p>
        <strong>Source:</strong>{" "}
        <a href={text.sourceUrl} target="_blank" rel="noopener noreferrer">
          {text.sourceUrl}
        </a>
      </p>
    ) : null}
    {text.sourceDesc ? (
      <p dangerouslySetInnerHTML={{ __html: text.sourceDesc }} />
    ) : null}
  </div>
);
