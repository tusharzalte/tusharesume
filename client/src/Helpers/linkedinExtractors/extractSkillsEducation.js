const SKILLS_EDUCATION_FORM_FIELDS = {
    EDUCATION: 'education',
    INSTITUTION: 'institution',
    YEAR_RANGE: 'yearRange',
}

const extractSkillsEducation = (user, form) => {
    try {
        form.setFieldsValue({
            [SKILLS_EDUCATION_FORM_FIELDS.EDUCATION]: (user?.alumniOf || [])
                .reverse()
                .filter(organization => organization['@type'] === 'EducationalOrganization')
                .map(({ name, member: { startDate, endDate } }, index) => ({
                    key: index,
                    [SKILLS_EDUCATION_FORM_FIELDS.INSTITUTION]: name,
                    [SKILLS_EDUCATION_FORM_FIELDS.YEAR_RANGE]: `${startDate} - ${endDate}`,
                })),
        });
    } catch (error) {
        throw error;
    }
}
export default extractSkillsEducation;