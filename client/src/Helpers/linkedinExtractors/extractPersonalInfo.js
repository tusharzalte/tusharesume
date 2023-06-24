const PERSONAL_INFO_FORM_FIELDS = {
    FIRSTNAME: 'firstName',
    LASTNAME: 'lastName',
    LINKEDIN: 'linkedIn',
    ADDRESS: 'address',
}

const extractPersonalInfo = (user, form) => {
    try {
        const fullNameChunks = (user?.name || '').split(' ');
        form.setFieldsValue({
            [PERSONAL_INFO_FORM_FIELDS.FIRSTNAME]: fullNameChunks.slice(0, fullNameChunks.length - 1).join(' '),
            [PERSONAL_INFO_FORM_FIELDS.LASTNAME]: fullNameChunks[fullNameChunks.length - 1],
            [PERSONAL_INFO_FORM_FIELDS.LINKEDIN]: user?.url,
            [PERSONAL_INFO_FORM_FIELDS.ADDRESS]: user?.address?.addressLocality,
        });
    } catch (error) {
        throw error;
    }
}
export default extractPersonalInfo;