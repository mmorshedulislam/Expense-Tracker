"use client";
import { useSelector } from "react-redux";
import styles from "./page.module.css";
import type { RootState } from "./../lib/store";

export default function Home() {
  const { Utility } = useSelector((state: RootState) => state.limit);

  return (
    <div className={styles.page}>
      <h1>Utility: {Utility}</h1>
    </div>
  );
}
