export default function negotiationOutcome(employer, applicant) {
    const max = new Number(employer);
    const min = new Number(applicant);

    return  {
        succeded: min <= max,
        salaries: min.valueOf() === max.valueOf() ? [
            {
                entity: "both",
                salary: convertToMoney(max),
                text: "Both parties agreed on a salary!"
            }
        ] : [
            {
                entity: "employee",
                salary: convertToMoney(max),
                text: "Employee expects at least"
            },
            {
                entity: "employer",
                salary: convertToMoney(min),
                text: "Employer's maximum offer"
            },
        ]
    };
}

function convertToMoney(value) {
    return value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
};