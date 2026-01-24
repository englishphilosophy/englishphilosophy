type Props = {
  title: string;
  subtitle: string;
  siteLinks: { text: string; href: string; active: boolean }[];
};

export default ({ title, subtitle, siteLinks }: Props) => {
  return (
    <header class="grid gap-4 p-4 bg-primary lg:flex lg:justify-between lg:items-end">
      <hgroup class="grid gap-2 font-serif text-white text-center leading-none lg:text-left">
        <h1 class="text-3xl">{title}</h1>
        <h2 class="text-2xl italic">{subtitle}</h2>
      </hgroup>
      <nav class="flex gap-2 justify-center">
        {siteLinks.map((link) => (
          <a
            href={link.href}
            class={`text-lg bold text-white py-1 px-2 border-b-3 ${link.active ? "border-beige" : "border-transparent"} hover:border-beige transition`}
          >
            {link.text}
          </a>
        ))}
      </nav>
    </header>
  );
};
