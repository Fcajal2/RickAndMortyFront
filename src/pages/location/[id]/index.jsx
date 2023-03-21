import Head from "next/head";
import Link from "next/link";
import CharacterTile from "@/components/character";
import styles from "../../../styles/Main.module.css";
import Navbar from "@/components/navbar";

const defaultEndpoint = "https://rickandmortyapi.com/api/location/";

export async function getServerSideProps({ query }) {
  const { id } = query;
  //fetching data
  const res = await fetch(`${defaultEndpoint}/${id}`);
  const data = await res.json();
  //send fetched data to the page compenent via props
  return {
    props: {
      data,
    },
  };
}

export default function Location({ data }) {
  return (
    <>
      <Head>
        <title>{data.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <h1>{data.name}</h1>

        <div>
          <div>
            <h2>Location Details</h2>
            <ul>
              <li>
                <strong>Name:</strong> {data.name}
              </li>
              <li>
                <strong>Type:</strong> {data.type}
              </li>
              <li>
                <strong>Dimension:</strong> {data.dimension}
              </li>
            </ul>
          </div>
          <div>
            {data.residents.length ? (
              <div>
                <h1>Current Residents</h1>
                <ul className={styles.character_tiles}>
                  {data.residents.map((resident) => {
                    return <CharacterTile endpoint={resident} />;
                  })}
                </ul>
              </div>
            ) : (
              <h1>No Resident Characters</h1>
            )}
          </div>
        </div>
        <p>
          <Link href="/location">Back to All Locations</Link>
        </p>
      </main>
    </>
  );
}
