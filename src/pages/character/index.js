import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";
import Pagination from "@/components/pagination";
import Search from "@/components/search";
import styles from "../../styles/Main.module.css";
import Filter from "@/components/filter";
import Navbar from "@/components/navbar";

const defaultEndpoint = "https://rickandmortyapi.com/api/character/";

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
  const [filter, setFilter] = useState();

  useEffect(() => {
    async function request() {
      const res = await fetch(
        `${defaultEndpoint}?page=${page}${search ?? ""}${filter ?? ""}`
      );
      const nextData = await res.json();
      updateInfo(nextData.info);
      updateResults(nextData.results);
    }
    request();
  }, [page, search, filter]);

  return (
    <>
      <Head>
        <title>R&M Characters</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <p>Characters</p>

        <Search setSearch={setSearch} updatePage={updatePage} />
        <Filter setFilter={setFilter} updatePage={updatePage} />

        {results ? (
          <ul className={styles.character_tiles}>
            {results.map((result) => {
              const { id, name, image, status } = result;
              return (
                <li key={id} className={`${styles.filterDiv} ${status}`}>
                  <Link href="/character/[id]" as={`/character/${id}`}>
                    <img src={image} alt={`${name} Thumb`} />
                  </Link>
                  <h3>{name}</h3>
                </li>
              );
            })}
          </ul>
        ) : (
          <h1>No Characters Found</h1>
        )}

        <Pagination page={page} updatePage={updatePage} info={info} />
      </main>
    </>
  );
}
