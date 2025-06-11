import type { GenderTypes } from '@/types/users';

export interface IUserInfo {
    age: number;
    gender: GenderTypes;
}

export interface IUserInstructions {
    score: number;
    fails: number;
    duration: number;
}

export interface IUserTraining {
    rounds: number;
    duration: number;
}

export interface IUserTest {
    rounds: number;
    profit: number;
    bonus?: number;
    duration: number;
}
