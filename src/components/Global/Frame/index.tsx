import { PropsWithChildren } from "react";
import styles from "./styles.module.css";

type Props = {} & PropsWithChildren;

function Frame({ children }: Props) {
	return (
		<div className={styles.frameWrapper}>
			<div className={styles.frame}>{children}</div>
		</div>
	);
}

export { Frame };
