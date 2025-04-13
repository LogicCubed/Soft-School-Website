import { SimpleForm, Create, TextInput, required, ReferenceInput, BooleanInput } from "react-admin";

export const ChallengeOptionCreate = () => {
    return (
        <Create>
            <SimpleForm>
                <TextInput
                    source="text"
                    validate={[required()]}
                    label="Text"
                />
                <BooleanInput
                    source="correct"
                    label="Correct Option"
                />
                <ReferenceInput
                    source="challengeId"
                    reference="challenges"
                />
            </SimpleForm>
        </Create>
    );
};
