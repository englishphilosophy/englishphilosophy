type Props = {
  query?: string;
  order?: string;
};

export default ({ query, order }: Props) => (
  <div class="library-controls">
    <form id="library-controls">
      <input
        name="query"
        type="text"
        placeholder="Search authors"
        aria-label="Search Authors"
        value={query}
        autoFocus
        autoComplete="off"
      />
      <select name="order" aria-label="Order Authors" value={order}>
        <option value="publication">chronological (first publication)</option>
        <option value="birth">chronological (birth)</option>
        <option value="alphabetical">alphabetical</option>
      </select>
    </form>
  </div>
);
