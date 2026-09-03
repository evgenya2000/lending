'use client';
import styles from './answer.module.css';

export const Answer = ({ text }: { text: string }) => {
    console.log(text);
    return (
        <div className={styles["container"]}>
            <h3>{text}</h3>
        </div>
    );
};