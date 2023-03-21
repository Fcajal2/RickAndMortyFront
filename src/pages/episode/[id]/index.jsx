import Head from "next/head";
import Link from "next/link";
import CharacterTile from "@/components/character";
import styles from "../../../styles/Main.module.css";
import Navbar from "@/components/navbar";

const defaultEndpoint = "https://rickandmortyapi.com/api/episode/";

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
            <h2>Episode Details</h2>
            <ul>
              <li>
                <strong>Name:</strong> {data.name} - {data.episode}
              </li>
              <li>
                <strong>Air Date:</strong> {data.air_date}
              </li>
            </ul>
          </div>
          <div>
            {data.characters.length ? (
              <div>
                <h1>Characters</h1>
                <ul className={styles.character_tiles}>
                  {data.characters.map((character) => {
                    return <CharacterTile endpoint={character} />;
                  })}
                </ul>
              </div>
            ) : (
              <h1>No Appearing Characters</h1>
            )}
          </div>
        </div>
        <p>
          <Link href="/episode">Back to All Episodes</Link>
        </p>
      </main>
    </>
  );
}
