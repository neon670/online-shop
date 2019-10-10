import React from 'react';

import { GroupContainer, FormInputLabel, FormInputContainer } from  './form-input.styles';

const FormInput = ({handleChange, label, ...otherProps}) => (

	<GroupContainer>
		<FormInputContainer onChange={handleChange} {...otherProps} />
		{
			label ? (
		      <FormInputLabel className={props.value.length ? 'shrink' : ''}>
		        {label}
		      </FormInputLabel>
		    ) : null
		}
	</GroupContainer>

);
export default FormInput;