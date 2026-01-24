import type { ComponentChildren, VNode } from "preact";

type Props = {
  children: ComponentChildren;
};

export default ({ children }: Props): VNode => (
  <main class="flex-1 bg-lightgray p-4 pb-12">
    <div class="grid gap-4 mx-auto max-w-xl">{children}</div>
  </main>
);
