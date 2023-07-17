import useEditContact from './useEditContact';

import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import Loader from '../../components/Loader';


export default function EditContact() {

	const {
		isLoading,
		contactName,
		contactFormRef,
		handleSubmit
	} = useEditContact();

	return (
		<>
			<PageHeader title={`Editar ${contactName || '...'}`}/>
			<Loader isLoading={isLoading}/>
			<ContactForm
				ref={contactFormRef}
				onSubmit={handleSubmit}
				buttonLabel='Salvar Alterações'
			/>
		</>
	);
}
