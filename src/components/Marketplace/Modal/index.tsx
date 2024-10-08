"use client";
import { useContext, useRef } from "react";
import { Button } from "../../Global/Button";
import styles from "./styles.module.css";
import { OfferSchema, type Offer, type OfferForm } from "@/schema/offer";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DashboardContext } from "../Dashboard";
import { Player } from "@/schema/players";
import { ActionReturn } from "@/actions/createOffer";

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

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		watch,
		control,
	} = useForm<FormData>({
		mode: "onSubmit",
		reValidateMode: "onChange",
		resolver: zodResolver(OfferSchema),
	});
	//TODO ver esse sandbox
	//https://codesandbox.io/p/sandbox/dynamic-radio-example-forked-et0wi?file=%2Fsrc%2Fcontent%2FContent.tsx
	// https://react-hook-form.com/docs/useformcontext

	//TODO Watch here is damaging performance (rerendering the whole formwhen these fields change)
	const [pricePerUnit, quantity, offerType] = watch([
		"pricePerUnit",
		"quantity",
		"offerType",
	]);
	console.log("rerender");
	const total = (pricePerUnit || 0) * (quantity || 0);
	const totalIsInvalid = total > playerGold && offerType === "BUY";

	const onSubmit = async (formData: FormData) => {
		if (selectedItem === undefined) {
			return;
		}
		//TODO se total estiver no useForm nem chegamos aqui. Tentar
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
						{
							//TODO try to use useController https://www.react-hook-form.com/api/usecontroller/
						}
						<Controller
							control={control}
							name="pricePerUnit"
							render={({ field: { onChange, value } }) => (
								<fieldset>
									<div>
										<label>Price Per Unit:</label>
										<input
											type="number"
											placeholder="0"
											value={value || 0}
											onChange={(e) => {
												const valueWithoutLeadingZeros = e.target.value.replace(
													/^0+/,
													""
												);
												onChange(valueWithoutLeadingZeros);
											}}
										/>
									</div>
									<p>{errors?.pricePerUnit?.message}</p>
								</fieldset>
							)}
						/>
						<Controller
							control={control}
							name="quantity"
							render={({ field: { onChange, value }, fieldState: {} }) => {
								console.log("Quantity rerendered");
								return (
									<fieldset>
										<div>
											<label>Amount:</label>
											<input
												type="number"
												placeholder="0"
												value={value || 0}
												onChange={(e) => {
													const valueWithoutLeadingZeros = e.target.value.replace(
														/^0+/,
														""
													);
													onChange(valueWithoutLeadingZeros);
												}}
											/>
										</div>
										<p>{errors?.quantity?.message}</p>
									</fieldset>
								);
							}}
						/>
						<Controller
							control={control}
							name="endDate"
							render={({ field: { onChange, value }, fieldState: { error } }) => (
								<fieldset>
									<div>
										<label>Ends At:</label>
										<input
											type="date"
											min={today()}
											onChange={(e) => onChange(new Date(e.target.value))}
											value={value ? formatDate(value) : ""}
										/>

										{error?.message && <p>{error?.message}</p>}
									</div>
								</fieldset>
							)}
						/>
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
							{totalIsInvalid && (
								<p className={styles.error}>
									{"Total price can't exceed player's total gold when buying"}
								</p>
							)}
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
						disabled={isSubmitting}
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

//TODO put in helpers or utils
function formatDate(date: Date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

export { Modal, formatDate };
