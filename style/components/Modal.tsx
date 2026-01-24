import type { ComponentChildren, VNode } from "preact";

type Props = {
  id: string;
  title: string;
  children: ComponentChildren;
};

export default ({ id, title, children }: Props): VNode => (
  <dialog
    id={id}
    class="flex flex-col max-w-md p-4 bg-transparent justify-center items-center"
  >
    <div class="bg-white shadow-md">
      <header class="bg-primary p-4 text-white flex justify-between items-start gap-1">
        {
          /* sometimes the title comes from Markit files compiled to HTML,
         /* so using dangerouslySetInnerHTML here instead of children */
        }
        <h3 class="flex-1" dangerouslySetInnerHTML={{ __html: title }} />
        <button
          type="button"
          class="bg-transparent text-xl bold leading-none"
          data-close={id}
        >
          &times;
        </button>
      </header>
      <main class="p-4">{children}</main>
    </div>
  </dialog>
);
