import Head from "next/head";
import styles from "@/styles/Main.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>R&M Wiki</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Link href="/" as={`/`} className={styles.title}>
          <h1 className={styles.title}>Rick and morty Wiki</h1>
        </Link>
        <p /* className={styles.description} */>Welcome to the wiki</p>

        <Link href="/character" as="/characters">
          <h2>Characters</h2>
        </Link>
        <Link href="/location" as="/locations">
          <h2>Locations</h2>
        </Link>
        <Link href="/episode" as="/episode">
          <h2>Episodes</h2>
        </Link>
      </main>
    </>
  );
}
