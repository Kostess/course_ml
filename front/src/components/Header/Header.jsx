import styles from "./Header.module.css";

export const Header = () => {
    return (
        <header className={styles.AppHeader}>
            <h1>Распознавание еды по фотографии</h1>
        </header>
    );
};