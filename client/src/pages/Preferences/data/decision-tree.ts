export type DecisionTreeMap = Record<string, number>;

export const question1Map: DecisionTreeMap = {
    '': 160,
    A: 240,
    AA: 280,
    AAA: 300,
    AAAA: 310,
    AAAAA: 32, // Will to take risks = 32
    AAAAB: 31, // Will to take risks = 31
    AAAB: 290,
    AAABA: 30, // Will to take risks = 30
    AAABB: 29, // Will to take risks = 29
    AAB: 260,
    AABA: 270,
    AABAA: 28, // Will to take risks = 28
    AABAB: 27, // Will to take risks = 27
    AABB: 250,
    AABBA: 26, // Will to take risks = 26
    AABBB: 25, // Will to take risks = 25
    AB: 200,
    ABA: 220,
    ABAA: 230,
    ABAAA: 24, // Will to take risks = 24
    ABAAB: 23, // Will to take risks = 23
    ABAB: 210,
    ABABA: 22, // Will to take risks = 22
    ABABB: 21, // Will to take risks = 21
    ABB: 180,
    ABBA: 190,
    ABBAA: 20, // Will to take risks = 20
    ABBAB: 19, // Will to take risks = 19
    ABBB: 170,
    ABBBA: 18, // Will to take risks = 18
    ABBBB: 17, // Will to take risks = 17
    B: 80,
    BA: 120,
    BAA: 140,
    BAAA: 150,
    BAAAA: 16, // Will to take risks = 16
    BAAAB: 15, // Will to take risks = 15
    BAAB: 130,
    BAABA: 14, // Will to take risks = 14
    BAABB: 13, // Will to take risks = 13
    BAB: 100,
    BABA: 110,
    BABAA: 12, // Will to take risks = 12
    BABAB: 11, // Will to take risks = 11
    BABB: 90,
    BABBA: 10, // Will to take risks = 10
    BABBB: 9, // Will to take risks = 9
    BB: 40,
    BBA: 60,
    BBAA: 70,
    BBAAA: 8, // Will to take risks = 8
    BBAAB: 7, // Will to take risks = 7
    BBAB: 50,
    BBABA: 6, // Will to take risks = 6
    BBABB: 5, // Will to take risks = 5
    BBB: 20,
    BBBA: 30,
    BBBAA: 4, // Will to take risks = 4
    BBBAB: 3, // Will to take risks = 3
    BBBB: 10,
    BBBBA: 2, // Will to take risks = 2
    BBBBB: 1 // Will to take risks = 1
} as const;

export const question3Map: DecisionTreeMap = {
    '': 154,
    B: 185,
    BB: 202,
    BBB: 210,
    BBBB: 215,
    BBBBB: 1, // Patience = 1
    BBBBA: 2, // Patience = 2
    BBBA: 206,
    BBBAB: 3, // Patience = 3
    BBBAA: 4, // Patience = 4
    BBA: 193,
    BBAB: 197,
    BBABB: 5, // Patience = 5
    BBABA: 6, // Patience = 6
    BBAA: 189,
    BBAAB: 7, // Patience = 7
    BBAAA: 8, // Patience = 8
    BA: 169,
    BAB: 177,
    BABB: 181,
    BABBB: 9, // Patience = 9
    BABBA: 10, // Patience = 10
    BABA: 173,
    BABAB: 11, // Patience = 11
    BABAA: 12, // Patience = 12
    BAA: 161,
    BAAB: 165,
    BAABB: 13, // Patience = 13
    BAABA: 14, // Patience = 14
    BAAA: 158,
    BAAAB: 15, // Patience = 15
    BAAAA: 16, // Patience = 16
    A: 125,
    AB: 139,
    ABB: 146,
    ABBB: 150,
    ABBBB: 17, // Patience = 17
    ABBBA: 18, // Patience = 18
    ABBA: 143,
    ABBAB: 19, // Patience = 19
    ABBAA: 20, // Patience = 20
    ABA: 132,
    ABAB: 136,
    ABABB: 21, // Patience = 21
    ABABA: 22, // Patience = 22
    ABAA: 129,
    ABAAB: 23, // Patience = 23
    ABAAA: 24, // Patience = 24
    AA: 112,
    AAB: 119,
    AABB: 122,
    AABBB: 25, // Patience = 25
    AABBA: 26, // Patience = 26
    AABA: 116,
    AABAB: 27, // Patience = 27
    AABAA: 28, // Patience = 28
    AAA: 106,
    AAAB: 109,
    AAABB: 29, // Patience = 29
    AAABA: 30, // Patience = 30
    AAAA: 103,
    AAAAB: 31, // Patience = 31
    AAAAA: 32 // Patience = 32
} as const;
