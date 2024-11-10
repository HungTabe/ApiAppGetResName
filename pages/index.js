import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [actorInput, setActorInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ actor: actorInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setActorInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Games Recommender</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <h3>Games for Couple Activities Recommender</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="actor"
            placeholder="Enter your GirlFriend or BoyFriend age"
            value={actorInput}
            onChange={(e) => setActorInput(e.target.value)}
          />
          <input type="submit" value="Recommend me some games" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
