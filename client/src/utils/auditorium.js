export const getAuditoriumById = async (auditoriumId) => {
	const response = await fetch(`/api/v1/auditoria/${auditoriumId}`);
	return await response.json();
};
