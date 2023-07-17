import { forwardRef } from 'react';
import PropTypes from 'prop-types';

import useContactForm from './useContactForm';

import { Form } from './styles';

import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';


const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {

	const {
		handleSubmit,
		getErrorMessageByFieldName,
		handleNameChange,
		name,
		isSubmitting,
		email,
		phone,
		isLoadingCategories,
		categoryId,
		categories,
		isFormValid,
		handleEmailChange,
		handlePhoneChange,
		setCategoryId
	} = useContactForm(onSubmit, ref);

	console.log('renderizei');

	return (
		<Form onSubmit={handleSubmit} noValidate>
			<FormGroup error={getErrorMessageByFieldName('name')}>
				<Input
					error={getErrorMessageByFieldName('name')}
					placeholder='Nome *'
					onChange={handleNameChange}
					value={name}
					disabled={isSubmitting}
				/>
			</FormGroup>

			<FormGroup error={getErrorMessageByFieldName('email')}>
				<Input
					type='email'
					error={getErrorMessageByFieldName('email')}
					placeholder='E-mail'
					onChange={handleEmailChange}
					value={email}
					disabled={isSubmitting}
				/>
			</FormGroup>

			<FormGroup error={getErrorMessageByFieldName('phone')}>
				<Input
					placeholder='Telefone'
					error={getErrorMessageByFieldName('phone')}
					onChange={handlePhoneChange}
					value={phone}
					disabled={isSubmitting}
					maxLength={15}
				/>
			</FormGroup>

			<FormGroup isLoading={isLoadingCategories}>
				<Select
					onChange={e => setCategoryId(e.target.value)}
					value={categoryId}
					disabled={isLoadingCategories || isSubmitting}
				>
					<option value="">{isLoadingCategories ? 'Carregando...' : 'Escolha a categoria'}</option>

					{categories.length > 0 && (categories.map((category) => (
						<option value={category.id} key={category.id}>
							{category.name}
						</option>
					)))}
				</Select>
			</FormGroup>

			<Button type="Submit" disabled={!isFormValid} isLoading={isSubmitting}>
				{buttonLabel}
			</Button>
		</Form>
	);
});

ContactForm.displayName = 'ContactForm';

ContactForm.propTypes = {
	buttonLabel: PropTypes.string.isRequired,
	onSubmit: PropTypes.func.isRequired
};

export default ContactForm;
