import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/Main.module.css";
import EpisodeList from "@/components/episodes";

const defaultEndpoint = "https://rickandmortyapi.com/api/character/";

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

export default function Charater({ data }) {
  return (
    <>
      <Head>
        <title>{data.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Link href="/" as={`/`} className={styles.title}>
          <h1 className={styles.title}>Rick and morty Wiki</h1>
        </Link>
        <h1 /* className={styles.title} */>{data.name}</h1>

        <div /* className={styles.profile} */>
          <div /* className={styles.profileimage} */>
            <img src={data.image} alt={data.name} />
          </div>
          <div /* className={styles.profile-details} */>
            <h2>Character Details</h2>
            <ul>
              <li>
                <strong>Name:</strong> {data.name}
              </li>
              <li>
                <strong>Status:</strong> {data.status}
              </li>
              <li>
                <strong>Gender:</strong> {data.gender}
              </li>
              <li>
                <strong>Species:</strong> {data.species}
              </li>
              <li>
                <strong>Location: </strong>
                <Link
                  href={`/location/${
                    data.location.url.split("/").slice(-1)[0]
                  }`}
                >
                  {data.location.name}
                </Link>
              </li>
              <li>
                <strong>Originally From: </strong>
                <Link
                  href={`/location/${data.origin.url.split("/").slice(-1)[0]}`}
                >
                  {data.origin.name}
                </Link>
              </li>
            </ul>
            <div>
              {data.episode.length ? (
                <div>
                  <h1>Episode Appearances</h1>
                  <ul className={styles.gridcontainer}>
                    {data.episode.map((episode) => {
                      return <EpisodeList endpoint={episode} />;
                    })}
                  </ul>
                </div>
              ) : (
                <h1>No Episode Records</h1>
              )}
            </div>
          </div>
        </div>
        <p>
          <Link href="/character" /* className={styles.back} */>
            Back to All Characters
          </Link>
        </p>
      </main>
    </>
  );
}
