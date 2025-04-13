import { Datagrid, List, NumberField, ReferenceField, TextField, BooleanField } from "react-admin";

export const ChallengeOptionList = () => {
    return (
        <List>
        <Datagrid rowClick="edit">
            <NumberField source="id"/>
            <TextField source="test"/>
            <BooleanField source="correct"/>
            <ReferenceField source="challengeId" reference="challenges"/>
        </Datagrid>
        </List>
    );
};