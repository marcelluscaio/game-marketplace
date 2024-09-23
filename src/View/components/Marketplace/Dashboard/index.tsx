"use client";
import { createContext, PropsWithChildren, useState } from "react";

type SelectedItem = {
	id: number;
	name: string;
	itemTypeId: number;
};
type DashboardContextType = {
	selectedItem: SelectedItem | undefined;
	setSelectedItem: (item: DashboardContextType["selectedItem"]) => void;
	searchTerm: string;
	setSearchTerm: (term: string) => void;
};
type Props = {} & PropsWithChildren;

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

function Dashboard({ children }: Props) {
	const [selectedItem, setSelectedItem] = useState<SelectedItem | undefined>(undefined);
	const [searchTerm, setSearchTerm] = useState("");

	return (
		<DashboardContext.Provider
			value={{ selectedItem, setSelectedItem, searchTerm, setSearchTerm }}
		>
			{children}
		</DashboardContext.Provider>
	);
}

//TODO create custom hook

export { DashboardContext, Dashboard };
