export enum Genders {
    Male = 'Male',
    Female = 'Female'
}

export const genderToHebrewMap: Record<string, Genders> = {
    זכר: Genders.Male,
    נקבה: Genders.Female
};
