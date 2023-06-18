import {FunctionComponent} from "react";
import MyCard from './MyCard';

export interface AdInterface {
    idOffre: number,
    libelleOffre: string,
    descriptionOffre: string,
    image: string,
}

interface AdProps {
    ad?: AdInterface,
    buttonName?: string,
    callback: Function,
}

const AdCard: FunctionComponent<AdProps> = ({ad, buttonName, callback = {}}) => {
    return (
        <MyCard
            id={ad.idOffre ?? 0}
            title={ad.libelleOffre ?? "title"}
            text={ad.descriptionOffre ?? "text"}
            image={ad.image ?? "#"}
            buttonName={buttonName ?? "button"}
            action={callback}
        />
    );
};
export default AdCard;