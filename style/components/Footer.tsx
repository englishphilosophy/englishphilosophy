type Props = {
  site: string;
};

export default ({ site }: Props) => (
  <footer class="bg-black text-white">
    <div class="grid gap-4 mx-auto max-w-xl p-4 pt-12 lg:flex lg:justify-between lg:pt-24 lg:px-8 lg:pb-12">
      <p class="flex-1">
        {site} is developed and maintained by{" "}
        <a class={linkClasses} href="https://merivale.uk">Amyas Merivale</a>. All comments and
        suggestions are welcome.
      </p>
      <div class="grid">
        <a class={linkClasses} href="https://englishphilosophy.org">
          English Philosophical Texts Online
        </a>
        <a class={linkClasses} href="https://davidhume.org">Hume Texts Online</a>
        <a class={linkClasses} href="https://github.com/englishphilosophy">
          Early English Philosophy @ GitHub
        </a>
      </div>
    </div>
  </footer>
);

const linkClasses = "text-beige hover:underline";
