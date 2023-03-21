export default function Pagination({ page, updatePage, info }) {
  function handlePrev() {
    if (info.prev) {
      updatePage(page - 1);
    }
  }

  function handleNext() {
    if (info.next) {
      updatePage(page + 1);
    }
  }

  function handleFirst() {
    if (page !== 1) {
      updatePage(1);
    }
  }

  function handleLast() {
    if (page !== info.pages) {
      updatePage(info.pages);
    }
  }

  return (
    <>
      <button onClick={handleFirst}>First</button>
      <button onClick={handlePrev}>{"<<"}</button>
      <button onClick={handlePrev}>{page-1}</button>
      <button>{page}</button>
      <button onClick={handleNext}>{page + 1}</button>
      <button onClick={handleNext}>{">>"}</button>
      <button onClick={handleLast}>Last</button>
    </>
  );
}
