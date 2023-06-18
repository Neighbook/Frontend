import type {FunctionComponent} from "react";
import { useEffect, useState} from "react";
import Stack from "@mui/material/Stack";
import {TextField, Typography} from "@mui/material";
import MySelect from "../components/MySelect";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";


interface MarketPlaceFilterProps {
    values: object,
    callback: Function,
}

interface FiltersInterface {
    titre?: string,
    user?: string,
    tag?: number
}


const MarketplaceFilter:FunctionComponent<MarketPlaceFilterProps> = ({values, callback}) => {
    const [filters, setFilters] = useState<FiltersInterface>({titre: "", user: "", tag: 0});


    useEffect(() => {
        setFilters(values);
    }, [values]);

    const handleChange = (from: string, value: number | string) => {
        const copy: FiltersInterface = {...filters};
        // @ts-ignore
        copy[from] = value;
        setFilters(copy);
        console.log(copy, filters);
        // callback(copy);
    };

    const submitFilters = () => {
        callback(filters);
    };

    return (
        <Box>
            <Box sx={{height: 35}} />
            <Stack spacing={5} sx={{paddingLeft: 2, paddingRight: 2}}>
                <Typography>
                    Filtres
                </Typography>
                <TextField
                    label={"Titre"}
                    onChange={(event) => { handleChange("libelle", event.target.value); }}
                    value={filters.titre}
                />
                <TextField label={"Nom d'utilisateur"}
                    onChange={(event) => { handleChange("libelle", event.target.value); }}
                    value={filters.user}
                />
                <MySelect
                    label={"Tags"}
                    className={"TagFilter"}
                    dataSourceUrl={"lll"}
                    bindingScheme={{
                        Key: "id",
                        Label: "label"
                    }}
                    // callback={(value) => handleChange("libelle", value)}
                    callback={(value: number) => { console.log('click', value); }}
                    value={filters?.tag ?? 0}
                />
                <Button onClick={submitFilters}>
                    Confirmer
                </Button>
            </Stack>
        </Box>


    );
};
export default MarketplaceFilter;