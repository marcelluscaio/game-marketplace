import { Marketplace } from "@/View/screens/Marketplace";

type Props = {
	params: {
		id: string;
	};
};

export default async function MarketplaceRoute({ params: { id } }: Props) {
	return <Marketplace id={id} />;
}

export type { Props as RouteProps };
