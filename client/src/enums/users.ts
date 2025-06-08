export enum Genders {
    Male = 'Male',
    Female = 'Female'
}

export enum Educations {
    // SomeHighSchool = 'Some High School',
    HighSchool = 'High School',
    BachelorsDegree = "Bachelor's Degree",
    MastersDegree = "Master's Degree",
    PhdOrHigher = 'Ph.D. or higher'
}

export const genderToHebrewMap: Record<string, Genders> = {
    זכר: Genders.Male,
    נקבה: Genders.Female
};

export const educationToHebrewMap: Record<string, Educations> = {
    // 'תיכון לא גמור': Educations.SomeHighSchool,
    תיכון: Educations.HighSchool,
    'תואר ראשון': Educations.BachelorsDegree,
    'תואר שני': Educations.MastersDegree,
    'דוקטורט או יותר': Educations.PhdOrHigher
};
