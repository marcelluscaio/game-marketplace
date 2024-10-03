"use client";
import { useContext, useRef } from "react";
import { Button } from "../../Button";
import styles from "./styles.module.css";
import { OfferSchema, type Offer, type OfferForm } from "@/server/schema/offer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ActionReturn } from "@/server/actions/createOffer";
import { DashboardContext } from "../Dashboard";
import { Player } from "@/server/schema/players";

type FormData = OfferForm;
type Props = {
	formAction: (data: Offer) => Promise<ActionReturn>;
	playerGold: Player["gold"];
};

function Modal({ formAction, playerGold }: Props) {
	const context = useContext(DashboardContext);
	if (!context) {
		throw new Error("ItemList must be used within a DashboardContext Provider");
	}
	const { selectedItem, setNewItem } = context;

	const ref = useRef<HTMLDialogElement | null>(null);
	const successDialog = useRef<HTMLDialogElement | null>(null);

	function closeModal() {
		ref.current?.close();
	}
	function openModal() {
		ref.current?.showModal();
	}

	function openSuccessDialog() {
		successDialog.current?.showModal();
	}
	function closeSuccessDialog() {
		successDialog.current?.close();
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
	const offerType = watch("offerType");

	const onSubmit = async (formData: FormData) => {
		if (selectedItem === undefined) {
			return;
		}
		if (total > playerGold && offerType === "BUY") {
			return;
		}
		const result = await formAction({
			...formData,
			itemId: selectedItem.id,
			itemTypeId: selectedItem.itemTypeId,
			totalPrice: total,
		});
		if (result.status === "success") {
			/* const { offer } = result; */
			openSuccessDialog();
		} else {
			//TODO show error dialog
			/* const { message } = result; */
		}
	};

	const handleSuccessDialog = () => {
		closeSuccessDialog();
		closeModal();
		setNewItem(true);
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
					<p>Item: {selectedItem?.name}</p>
					<form
						className={styles.form}
						onSubmit={handleSubmit(onSubmit)}
					>
						<fieldset>
							<div>
								<label>Price Per Unit:</label>
								<input
									type="text"
									{...register("pricePerUnit", {
										valueAsNumber: true,
									})}
								/>
							</div>
							<p>{errors?.pricePerUnit?.message}</p>
						</fieldset>
						<fieldset>
							<div>
								<label>Amount:</label>
								<input
									type="text"
									{...register("quantity", { valueAsNumber: true })}
								/>
							</div>
							<p>{errors?.quantity?.message}</p>
						</fieldset>
						<fieldset>
							<div>
								<label>Ends At:</label>
								<input
									type="date"
									min={today()}
									{...register("endDate", {
										valueAsDate: true,
										setValueAs: (value) => (value === "" ? "" : value),
									})}
								/>
							</div>
							<p>{errors?.endDate?.message}</p>
						</fieldset>
						<fieldset>
							<div>
								<legend>Offer Type:</legend>
								<div className={styles.radioGroup}>
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
								</div>
							</div>
							<p>{errors?.offerType?.message}</p>
						</fieldset>
						<div className={styles.totalPrice}>
							<p>
								<span>Total Price </span>
								<span>{total}</span>
							</p>
							<p className={styles.error}>
								{total > playerGold &&
									offerType === "BUY" &&
									"Total price can't exceed player's total gold when buying"}
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
			<dialog
				ref={successDialog}
				className={styles.successModal}
				onClick={(e) => {
					if ((e.target as HTMLElement).tagName === "DIALOG") {
						handleSuccessDialog();
					}
				}}
			>
				<div className={styles.successContainer}>
					<p>Created successfully</p>
					<Button
						onClick={handleSuccessDialog}
						text="Fechar"
					/>
				</div>
			</dialog>
		</>
	);
}

function today() {
	const date = new Date();
	return formatDate(date);
}

function formatDate(date: Date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

export { Modal, formatDate };
