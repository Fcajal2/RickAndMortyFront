import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <div>
        <Link href="/" as={`/`}>
          <h1>Rick and morty Wiki</h1>
        </Link>
        <Link href="/character" as="/character">
          <h2>Characters</h2>
        </Link>
        <Link href="/location" as="/location">
          <h2>Locations</h2>
        </Link>
        <Link href="/episode" as="/episode">
          <h2>Episodes</h2>
        </Link>
      </div>
    </>
  );
}
