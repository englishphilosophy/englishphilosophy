import type { Block } from "@englishphilosophy/texts";
import url from "../utils/url.ts";

type Props = {
  blocks: Block[];
};

export default ({ blocks }: Props) => (
  <div class="blocks">
    {blocks.map((block) => {
      const content = block.speaker
        ? `<em>${block.speaker}</em>. ${block.text}`
        : block.text;
      return (
        <div class="block" id={block.id.split(".").pop()}>
          <div class="id">
            <a href={url(block)}>{block.id}</a>
          </div>
          <div
            class="content"
            dangerouslySetInnerHTML={{ __html: content.replaceAll("&", "\&") }}
          />
        </div>
      );
    })}
  </div>
);
