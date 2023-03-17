import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/Main.module.css";
import CharacterTile from "@/components/character";

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
  //const { name, image, gender, location, origin, species, status } = data;
  const name = data.name;
  const type = data.type;
  const dimension = data.dimension;
  const residents = data.residents;

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
            <h2>Location Details</h2>
            <ul>
              <li>
                <strong>Name:</strong> {name}
              </li>
              <li>
                <strong>Type:</strong> {type}
              </li>
              <li>
                <strong>Dimension:</strong> {dimension}
              </li>
            </ul>
          </div>
          <div>
            {residents.length ? (
              <div>
                <h1>Current Residents</h1>
                <ul className={styles.gridcontainer}>
                  {residents.map((resident) => {
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
          <Link href="/location" /* className={styles.back} */>
            Back to All Locations
          </Link>
        </p>
      </main>
    </>
  );
}
