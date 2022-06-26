import { Dispatch, SetStateAction } from "react";
import { Icon, Select } from "react-materialize";

const BookStatus = ({stateHandler}:{stateHandler:Dispatch<SetStateAction<string>>}) => {

    const handler = (event:any) => {
        stateHandler(event.target.value);
    }

    return (
        <Select
            icon={<Icon >a</Icon>}
            id="input-book-status"
            label="Book Status"
            offset="s1"
            multiple={false}
            options={{
                dropdownOptions: {
                    alignment: 'right',
                    autoTrigger: true,
                    closeOnClick: true,
                    constrainWidth: true,
                    coverTrigger: true,
                }
            }}
            onChange={handler}
        >
            <option value="new">
                New
            </option>
            <option value="in progress">
                In progress
            </option>
            <option value="finished">
              Finished
            </option>
        </Select>
    );
}

export default BookStatus;