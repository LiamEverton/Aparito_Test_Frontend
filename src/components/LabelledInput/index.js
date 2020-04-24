import React from 'react'

export const LabelledInputTextType = 'text'
export const LabelledInputSubmitType = 'submit'

function LabelledInput({
                           type = LabelledInputTextType,
                           label = false,
                           name = "",
                           value
                       }) {
    return (
        <>
            {label && <label htmlFor="">{label}</label>}
            <input name={name} type={type} value={value}/>
        </>
    );
}

export default LabelledInput;