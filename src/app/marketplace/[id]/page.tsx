import { Marketplace } from "@/components/Marketplace";

type Props = {
	params: {
		id: string;
	};
};

export default async function Page({ params: { id } }: Props) {
	return <Marketplace id={id} />;
}

export type { Props as RouteProps };
