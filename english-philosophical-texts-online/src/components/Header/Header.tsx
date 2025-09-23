type Props = {
  section?: string;
};

export default ({ section }: Props) => {
  return (
    <header class="main-header">
      <hgroup>
        <h1>English Philosophical Texts Online</h1>
        <h2>
          A free online library of early modern English-language philosophical
          texts
        </h2>
      </hgroup>
      <nav>
        <a href="/" class={section === "texts" ? "active" : undefined}>
          Texts
        </a>
        <a href="/about" class={section === "about" ? "active" : undefined}>
          About
        </a>
      </nav>
    </header>
  );
};
