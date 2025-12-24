import styles from './Header.module.css';

export default function Header() {
    return (
        <header>
            <div className={styles.header + " py-4 text-2xl font-bold"}>
                Tomoneko-Lab Blog
            </div>
        </header>
    );
}