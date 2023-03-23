export default function Gender({ setGender, updatePage }) {
  function handleFilter(query) {
    const value = query || "";
    setGender(`&gender=${value}`);
    updatePage(1);
  }
  return (
    <div>
      <div id="myBtnContainer">
        <button class="btn active" onClick={() => handleFilter("")}>
          {" "}
          Show all
        </button>
        <button class="btn" onClick={() => handleFilter("male")}>
          {" "}
          Male
        </button>
        <button class="btn" onClick={() => handleFilter("female")}>
          {" "}
          Female
        </button>
        <button class="btn" onClick={() => handleFilter("genderless")}>
          {" "}
          Genderless
        </button>
        <button class="btn" onClick={() => handleFilter("unknown")}>
          {" "}
          Unknown
        </button>
      </div>
    </div>
  );
}
