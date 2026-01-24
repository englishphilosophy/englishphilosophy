import type { VNode } from "preact";

type Props = {
  id: string;
  title: string;
  children: VNode | VNode[];
};

export default ({ id, title, children }: Props) => (
  <dialog id={id} class="modal-wrapper">
    <div class="modal">
      <header>
        {/* sometimes the title comes from Markit files compiled to HTML,
         /* so using dangerouslySetInnerHTML here instead of children */}
        <h3 dangerouslySetInnerHTML={{ __html: title }} />
        <button type="button" class="close-modal-button" data-close={id}>
          &times;
        </button>
      </header>
      <main>{children}</main>
    </div>
  </dialog>
);
