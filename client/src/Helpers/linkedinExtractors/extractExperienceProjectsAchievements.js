const MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]
const SKILLS_PORTFOLIO_FORM_FIELDS = {
    EXPERIENCE: 'experience',
    COMPANY: 'company',
    POSITION: 'position',
    JOB_DESCRIPTION: 'description',
    JOB_PLACE: 'place',
    JOB_YEAR_RANGE: 'yearRange',
}

const extractExperienceProjectsAchievements = (user, form) => {
    try {
        form.setFieldsValue({
            [SKILLS_PORTFOLIO_FORM_FIELDS.EXPERIENCE]: [
                ...(user?.worksFor || [])
                .reverse()
                .map(({ name, member: { startDate } }, index) => {
                    const startDateObject = new Date(startDate);
                    const todayObject = new Date();
                    return {
                        key: name,
                        [SKILLS_PORTFOLIO_FORM_FIELDS.COMPANY]: name,
                        [SKILLS_PORTFOLIO_FORM_FIELDS.JOB_YEAR_RANGE]: `${MONTH_NAMES[startDateObject.getMonth()]}, ${startDateObject.getFullYear()} - ${MONTH_NAMES[todayObject.getMonth()]}, ${todayObject.getFullYear()}`,
                        [SKILLS_PORTFOLIO_FORM_FIELDS.POSITION]: (user?.jobTitle || [])[index],
                    }
                }),
                ...(user?.alumniOf || [])
                .reverse()
                .filter(organization => organization['@type'] === 'Organization')
                .map(({ name, location, member: { description, startDate, endDate } }, index) => {
                    const startDateObject = new Date(startDate);
                    const endDateObject = new Date(endDate);
                    return {
                        key: index,
                        [SKILLS_PORTFOLIO_FORM_FIELDS.COMPANY]: name,
                        [SKILLS_PORTFOLIO_FORM_FIELDS.JOB_YEAR_RANGE]: `${MONTH_NAMES[startDateObject.getMonth()]}, ${startDateObject.getFullYear()} - ${MONTH_NAMES[endDateObject.getMonth()]}, ${endDateObject.getFullYear()}`,
                        [SKILLS_PORTFOLIO_FORM_FIELDS.JOB_DESCRIPTION]: (description || '').replace(/<br>/g, '\n'),
                        [SKILLS_PORTFOLIO_FORM_FIELDS.JOB_PLACE]: location || '',
                    }
                }),
            ],
        });
    } catch (error) {
        throw error;
    }
}
export default extractExperienceProjectsAchievements;