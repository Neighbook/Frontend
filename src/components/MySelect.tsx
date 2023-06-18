import {MenuItem, Select} from "@mui/material";
import {FunctionComponent, useEffect, useState} from "react";

type MySelectProps = {
    dataSourceUrl?: string,
    dataSource?: [],
    bindingScheme: {Key: string, Label: string}
    label: string,
    className?: string,
    callback: Function,
    value: number,
}

const MySelect: FunctionComponent<MySelectProps> = ({
    className,
    dataSourceUrl,
    dataSource,
    bindingScheme,
    label,
    callback,
    value= 0,
}) => {
    const [data, setData] = useState<object[]>([{id:0, label: ""}]);
    const [selected, setSelected] = useState<any>(0);

    useEffect(() => {
        if(dataSource?.length > 0) {
            setData(dataSource);
        } else {
            if(dataSourceUrl) {
                doDatabind();
            }
        }


    }, []);

    const doDatabind = () => {
        // fetch(dataSourceUrl, {
        //         method: 'GET',
        //         mode: 'cors',
        //      }
        // ).then((res) => {
        //     setData(res.data)
        // });

        let placeholderData = [
            {
                id: 0,
                label: "-- Catégorie --"
            },
            {
                id: 1,
                label: "test 1"
            },
            {
                id: 2,
                label: "test 2"
            },
            {
                id: 3,
                label: "test 3"
            },
        ];
        setData(placeholderData);
        if(value && placeholderData.length > value) {
            setSelected(value);
        }

    }
    const handleChange = (selected) => {
        console.log(selected);
        setSelected(selected)
        if (callback) {
            callback(selected);
        }
    }

    return (
        <Select
            label={label}
            labelId={"my-select-label" + (className ? ` my-select-label-${className} ${className}` : "")}
            id={"my-select" + (className ? ` my-select-${className} ${className}` : "")}
            onChange={(event) => handleChange(event.target.value)}
            value={selected}
        >
            {data.map((item: object) => (
                <MenuItem
                    key={item[bindingScheme?.Key]}
                    value={item[bindingScheme?.Key]}
                >
                    {item[bindingScheme?.Label]}
                </MenuItem>
            ))}
        </Select>
    );
}
export default MySelect;