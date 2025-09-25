type Props = {
  searchParams?: URLSearchParams;
  searchError?: string;
};

export default ({ searchParams, searchError }: Props) => {
  const q = searchParams && searchParams.get("q")
    ? searchParams.get("q") ?? ""
    : "";
  const p = searchParams ? searchParams.get("p") === "on" : true;
  const c = searchParams ? searchParams.get("c") === "on" : true;
  const w = searchParams ? searchParams.get("w") === "on" : true;
  const v = searchParams ? searchParams.get("v") === "on" : true;
  const r = searchParams && searchParams.get("r")
    ? searchParams.get("r") ?? ""
    : "";
  const f = searchParams && searchParams.get("f")
    ? searchParams.get("f") ?? ""
    : "";

  return (
    <div class="search">
      <h4>Text Search</h4>
      <form method="get">
        <div class="search-query">
          <input
            type="search"
            name="q"
            required
            placeholder="text search"
            value={q}
          />
          <button type="submit">Search</button>
        </div>
        <div class="search-options">
          <label>
            <input type="checkbox" name="p" checked={p} /> ignore punctuation
          </label>
          <label>
            <input type="checkbox" name="c" checked={c} /> case insensitive
          </label>
          <label>
            <input type="checkbox" name="w" checked={w} /> match whole words
          </label>
          <label>
            <input type="checkbox" name="v" checked={v} />{" "}
            match variant spellings
          </label>
        </div>
      </form>
      <h4>Regular Expression Search</h4>
      <form method="get">
        <div class="search-query">
          <input
            type="search"
            name="r"
            required
            value={r}
            placeholder="regular expression"
          />
          <input type="search" name="f" value={f} placeholder="flags" />
          <button type="submit">Search</button>
        </div>
        {searchError ? <p class="search-error">{searchError}</p> : null}
      </form>
    </div>
  );
};
