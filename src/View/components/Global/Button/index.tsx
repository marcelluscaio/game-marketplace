import { ComponentPropsWithoutRef } from "react";
import styles from "./styles.module.css";

type Props = {
	text: string;
} & ComponentPropsWithoutRef<"button">;

function Button({ text, ...rest }: Props) {
	return (
		<button
			className={styles.button}
			{...rest}
		>
			{text}
		</button>
	);
}

export { Button };
