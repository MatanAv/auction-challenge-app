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
    A: 185,
    AA: 202,
    AAA: 210,
    AAAA: 215,
    AAAAA: 1,
    AAAAB: 2,
    AAAB: 206,
    AAABA: 3,
    AAABB: 4,
    AAB: 193,
    AABA: 197,
    AABAA: 5,
    AABAB: 6,
    AABB: 189,
    AABBA: 7,
    AABBB: 8,
    AB: 169,
    ABA: 177,
    ABAA: 181,
    ABAAA: 9,
    ABAAB: 10,
    ABAB: 173,
    ABABA: 11,
    ABABB: 12,
    ABB: 161,
    ABBA: 165,
    ABBAA: 13,
    ABBAB: 14,
    ABBB: 158,
    ABBBA: 15,
    ABBBB: 16,
    B: 125,
    BA: 139,
    BAA: 146,
    BAAA: 150,
    BAAAA: 17,
    BAAAB: 18,
    BAAB: 143,
    BAABA: 19,
    BAABB: 20,
    BAB: 132,
    BABA: 136,
    BABAA: 21,
    BABAB: 22,
    BABB: 129,
    BABBA: 23,
    BABBB: 24,
    BB: 112,
    BBA: 119,
    BBAA: 122,
    BBAAA: 25,
    BBAAB: 26,
    BBAB: 116,
    BBABA: 27,
    BBABB: 28,
    BBB: 106,
    BBBA: 109,
    BBBAA: 29,
    BBBAB: 30,
    BBBB: 103,
    BBBBA: 31,
    BBBBB: 32
} as const;
