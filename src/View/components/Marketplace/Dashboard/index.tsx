"use client";
import { createContext, PropsWithChildren, useState } from "react";

type DashboardContextType = {
	selectedItem: number;
	setSelectedItem: (item: number) => void;
};
const DashboardContext = createContext<DashboardContextType | undefined>(undefined);
type Props = {} & PropsWithChildren;
function Dashboard({ children }: Props) {
	const [selectedItem, setSelectedItem] = useState(0);

	return (
		<DashboardContext.Provider value={{ selectedItem, setSelectedItem }}>
			{children}
		</DashboardContext.Provider>
	);
}

export { DashboardContext, Dashboard };
