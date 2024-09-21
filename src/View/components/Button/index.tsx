import styles from "./styles.module.css";

type Props = {
	text: string;
};

function Button({ text }: Props) {
	return <button className={styles.button}>{text}</button>;
}

export { Button };
