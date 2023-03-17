import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/Main.module.css";
import CharacterTile from "@/components/character";

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
  //const { name, image, gender, location, origin, species, status } = data;
  const name = data.name;
  const air_date = data.air_date;
  const episode = data.episode;
  const characters = data.characters;

  return (
    <>
      <Head>
        <title>{name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 /* className={styles.title} */>{name}</h1>

        <div /* className={styles.profile} */>
          <div /* className={styles.profile-details} */>
            <h2>Episode Details</h2>
            <ul>
              <li>
                <strong>Name:</strong> {name} - {episode}
              </li>
              <li>
                <strong>Air Date:</strong> {air_date}
              </li>
            </ul>
          </div>
          <div>
            {characters.length ? (
              <div>
                <h1>Characters</h1>
                <ul className={styles.gridcontainer}>
                  {characters.map((character) => {
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
          <Link href="/episode" /* className={styles.back} */>
            Back to All Episodes
          </Link>
        </p>
      </main>
    </>
  );
}
