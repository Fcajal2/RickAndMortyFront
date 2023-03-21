export default function Search({ setSearch, updatePage }) {
  function handleOnSumbitSearch(e) {
    e.preventDefault();

    const { currentTarget = {} } = e;
    const fields = Array.from(currentTarget?.elements);
    const fieldQuery = fields.find((field) => field.name === "query");

    const value = fieldQuery.value || "";
    setSearch(`&name=${value}`);
    updatePage(1);
  }
  return (
    <div>
      <form onSubmit={handleOnSumbitSearch}>
        <input type="search" name="query" />
        <button>Search</button>
      </form>
    </div>
  );
}
