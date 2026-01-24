import type { ComponentChildren } from "preact";

type Props = {
  children: ComponentChildren;
};

export default ({ children }: Props) => (
  <main class="flex-1 bg-lightgray p-4 pb-12">
    <div class="grid gap-4 mx-auto max-w-xl">{children}</div>
  </main>
);
