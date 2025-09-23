import type { VNode } from "preact";

type Props = {
  children: VNode | VNode[];
};

export default ({ children }: Props) => (
  <header class="sub-header">
    {children}
  </header>
);
