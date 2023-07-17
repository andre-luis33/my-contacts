export default function isPhoneValid(phoneNumber) {
	phoneNumber = phoneNumber.replace(/\D/g, '');
	return phoneNumber.length > 9;
}
