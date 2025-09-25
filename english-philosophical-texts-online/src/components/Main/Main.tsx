import type { VNode } from "preact";

type Props = {
  children: VNode | VNode[];
};

export default ({ children }: Props) => (
  <main class="main">
    <div class="container">{children}</div>
  </main>
);
