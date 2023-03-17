import { useEffect, useState } from "react";
import Link from "next/link";

export default function CharacterTile({ endpoint }) {
  const [info, setInfo] = useState();

  useEffect(() => {
    async function request() {
      const res = await fetch(endpoint);

      const data = await res.json();
      setInfo(data);
    }
    request();
  }, [endpoint]);

  return (
    <>
      {info ? (
        <li key={info.id} /* className={styles.card} */>
          <Link href="/character/[id]" as={`/character/${info.id}`}>
            <img src={info.image} alt={`${info.name} Thumb`} />
            <h3>
              {info.name} - {info.status}
            </h3>
          </Link>
        </li>
      ) : (
        <h3>Loading...</h3>
      )}
    </>
  );
}
