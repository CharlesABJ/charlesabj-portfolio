// app/card/[slug]/page.tsx

import { notFound } from "next/navigation";
import Card from "../Card/Card";
import { getCardProfile } from "../../../datas/cardProfiles";

type PageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function Page({ params }: PageProps) {
    const { slug } = await params;
    const profile = getCardProfile(slug);

    if (!profile) {
        notFound();
    }

    return <Card profile={profile} />;
}