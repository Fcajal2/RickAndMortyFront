export default function Filter({ setFilter, updatePage }) {
  function handleFilter(query) {
    const value = query || "";
    setFilter(`&status=${value}`);
    updatePage(1);
  }
  return (
    <div>
      <div id="myBtnContainer">
        <button class="btn active" onClick={() => handleFilter("")}>
          {" "}
          Show all
        </button>
        <button class="btn" onClick={() => handleFilter("alive")}>
          {" "}
          Alive
        </button>
        <button class="btn" onClick={() => handleFilter("dead")}>
          {" "}
          Dead
        </button>
        <button class="btn" onClick={() => handleFilter("unknown")}>
          {" "}
          Unknown
        </button>
      </div>
    </div>
  );
}
