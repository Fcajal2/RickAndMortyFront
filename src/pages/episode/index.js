import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";
import Pagination from "../../components/pagination";
import Search from "../../components/search";
import styles from "../../styles/Main.module.css";
import Navbar from "../../components/navbar";

const defaultEndpoint = "https://rickandmortyapi.com/api/episode/";

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
  const [search, setSearch] = useState();

  useEffect(() => {
    async function request() {
      const res = await fetch(`${defaultEndpoint}?page=${page}${search ?? ""}`);
      const nextData = await res.json();
      updateInfo(nextData.info);
      updateResults(nextData.results);
    }
    request();
  }, [page, search]);

  return (
    <>
      <Head>
        <title>R&M Episodes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <p>Episodes</p>

        <Search setSearch={setSearch} updatePage={updatePage} />

        {results ? (
          <ul className={styles.character_tiles}>
            {results.map((result) => {
              const { id, name, episode } = result;
              return (
                <li key={id}>
                  <Link href="/episode/[id]" as={`/episode/${id}`}>
                    <h3>{name}</h3>
                    <h5>{episode}</h5>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <h1>No Episodes Found</h1>
        )}

        <Pagination page={page} updatePage={updatePage} info={info} />
      </main>
    </>
  );
}
