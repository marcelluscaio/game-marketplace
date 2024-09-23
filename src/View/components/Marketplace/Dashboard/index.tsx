"use client";
import { createContext, PropsWithChildren, useState } from "react";

type DashboardContextType = {
	selectedItem:
		| {
				id: number;
				name: string;
				itemTypeId: number;
		  }
		| undefined;
	setSelectedItem: (item: DashboardContextType["selectedItem"]) => void;
};
const DashboardContext = createContext<DashboardContextType | undefined>(undefined);
type Props = {} & PropsWithChildren;
function Dashboard({ children }: Props) {
	const [selectedItem, setSelectedItem] = useState<
		DashboardContextType["selectedItem"] | undefined
	>(undefined);

	return (
		<DashboardContext.Provider value={{ selectedItem, setSelectedItem }}>
			{children}
		</DashboardContext.Provider>
	);
}

export { DashboardContext, Dashboard };
