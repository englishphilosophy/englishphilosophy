import type { VNode } from "preact";

type Props = {
  children: VNode | VNode[];
};

export default ({ children }: Props) => <div class="reader">{children}</div>;
