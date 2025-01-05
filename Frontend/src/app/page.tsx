"use client";
import { useDispatch, useSelector } from "react-redux";
import styles from "./page.module.css";
import type { RootState, AppDispatch } from "./../lib/store";
import { increment } from "@/lib/features/counter/counterSlice";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { value } = useSelector((state: RootState) => state.counter);

  return (
    <div className={styles.page}>
      <h1>Count: {value}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
    </div>
  );
}
