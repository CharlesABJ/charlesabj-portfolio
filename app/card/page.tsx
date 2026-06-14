import { getCardProfile } from "@/datas/cardProfiles";
import Card from "./Card/Card";
import { notFound } from "next/navigation";


export default function Page() {

    const centralProfile = getCardProfile("central-abj");
    if (!centralProfile) {
        notFound();
    }
    return <Card profile={centralProfile} isCompanyCard />;
}