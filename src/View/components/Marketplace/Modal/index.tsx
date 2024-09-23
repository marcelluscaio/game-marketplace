"use client";
import { useRef } from "react";
import { Button } from "../../Button";
import styles from "./styles.module.css";
import { OfferSchema, type Offer } from "@/server/schema/offer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ActionReturn } from "@/server/actions/createOffer";

type FormData = Omit<Offer, "itemId">;
type Props = {
	//TODO isso deve vir de um tipo a aprtir de um schema
	item: { id: number; name: string };
	formAction: (data: Offer) => Promise<ActionReturn>;
};

function today() {
	const date = new Date();
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

function Modal({ item, formAction }: Props) {
	const ref = useRef<HTMLDialogElement | null>(null);

	function closeModal() {
		ref.current?.close();
	}
	function openModal() {
		ref.current?.showModal();
	}

	const { register, handleSubmit, formState, watch } = useForm<FormData>({
		mode: "onSubmit",
		reValidateMode: "onChange",
		defaultValues: { pricePerUnit: 0, quantity: 0 },
		resolver: zodResolver(OfferSchema),
	});
	const { errors } = formState;
	const total = watch(["pricePerUnit", "quantity"]).reduce(
		(acc, current) => acc * current,
		1
	);

	const onSubmit = async (formData: FormData) => {
		const result = await formAction({ ...formData, itemId: item.id });
		if (result.status === "success") {
			//TODO Show success dialog
			//TODO Dialog closes modal and refreshes page
			const { offer } = result;
		} else {
			//TODO show error dialog
			const { message } = result;
		}
	};

	return (
		<>
			<Button
				text="Create Offer"
				onClick={openModal}
			/>
			<dialog
				ref={ref}
				className={styles.modal}
				onClick={(e) => {
					if ((e.target as HTMLElement).tagName === "DIALOG") {
						closeModal();
					}
				}}
			>
				<div className={styles.container}>
					<p>Item: {item.name}</p>
					<form
						className={styles.form}
						onSubmit={handleSubmit(onSubmit)}
					>
						<fieldset>
							<label>Price Per Unit:</label>
							<input
								type="text"
								{...register("pricePerUnit", {
									valueAsNumber: true,
								})}
							/>
							<p>{errors?.pricePerUnit?.message}</p>
						</fieldset>
						<fieldset>
							<label>Amount:</label>
							<input
								type="text"
								{...register("quantity", { valueAsNumber: true })}
							/>
							<p>{errors?.quantity?.message}</p>
						</fieldset>
						<fieldset>
							<label>Ends At:</label>
							<input
								type="date"
								min={today()}
								{...register("endDate", {
									valueAsDate: true,
									setValueAs: (value) => (value === "" ? "" : value),
								})}
							/>
							<p>{errors?.endDate?.message}</p>
						</fieldset>
						<fieldset>
							<legend>Offer Type:</legend>
							<div>
								<label htmlFor="buy">Buy:</label>
								<input
									type="radio"
									id="buy"
									value="BUY"
									{...register("offerType")}
								/>
							</div>
							<div>
								<label htmlFor="sell">Sell:</label>
								<input
									type="radio"
									id="sell"
									value="SELL"
									{...register("offerType")}
								/>
							</div>
							<p>{errors?.offerType?.message}</p>
						</fieldset>
						<div>
							<p>
								<span>Total Price </span>
								<span>{total}</span>
							</p>
						</div>
						<div className={styles.buttonContainer}>
							<Button
								type="reset"
								text="Cancel"
								onClick={closeModal}
							/>
							<Button
								type="submit"
								text="Create Offer"
							/>
						</div>
					</form>
				</div>
			</dialog>
		</>
	);
}

export { Modal };