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
        <h3>{title}</h3>
        <button type="button" class="close-modal-button" data-close={id}>
          &times;
        </button>
      </header>
      <main>{children}</main>
    </div>
  </dialog>
);
