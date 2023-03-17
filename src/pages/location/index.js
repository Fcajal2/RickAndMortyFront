import Head from "next/head";
import styles from "@/styles/Main.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import Pagination from "@/components/pagination";

const defaultEndpoint = "https://rickandmortyapi.com/api/location/";

export async function getServerSideProps() {
  //fetching data
  const res = await fetch(defaultEndpoint);
  const data = await res.json();
  //send fetched data to the page compenent via props
  return {
    props: {
      data,
    },
  };
}

export default function Home({ data }) {
  const { info: defaultInfo = {}, results: defaultResults = [] } = data;
  const [results, updateResults] = useState(defaultResults);
  const [info, updateInfo] = useState(defaultInfo);
  const [page, updatePage] = useState(1);
  const [filter, updateFilter] = useState();

  useEffect(() => {
    async function request() {
      const res = await fetch(
        `${defaultEndpoint}?page=${page}&name=${filter ?? ""}`
      );
      const nextData = await res.json();
      updateInfo(nextData.info);
      updateResults(nextData.results);
    }
    request();
  }, [page, filter]);

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

  function handleOnSumbitSearch(e) {
    e.preventDefault();

    const { currentTarget = {} } = e;
    const fields = Array.from(currentTarget?.elements);
    const fieldQuery = fields.find((field) => field.name === "query");

    const value = fieldQuery.value || "";
    updateFilter(value);
    updatePage(1);
  }

  return (
    <>
      <Head>
        <title>R&M Locations</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Link href="/" as={`/`} className={styles.title}>
          <h1 className={styles.title}>Rick and morty Wiki</h1>
        </Link>
        <p /* className={styles.description} */>Locations</p>

        <form /* className={styles.search} */ onSubmit={handleOnSumbitSearch}>
          <input type="search" name="query" />
          <button>Search</button>
        </form>

        {results ? (
          <ul className={styles.gridcontainer}>
            {results.map((result) => {
              const { id, name, type } = result;
              return (
                <li key={id} /* className={styles.card} */>
                  <Link href="/location/[id]" as={`/location/${id}`}>
                    <h3>{name}</h3>
                    <h5>{type}</h5>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <h1>No Locations Found</h1>
        )}

        <Pagination page={page} updatePage={updatePage} info={info} />
      </main>
    </>
  );
}
