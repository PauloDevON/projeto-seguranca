export type AntiBotChallenge = {
    num1: number;
    num2: number;
    expectedSum: number;
};

export const generateAntiBotChallenge = (): AntiBotChallenge => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    return {
        num1,
        num2,
        expectedSum: num1 + num2,
    };
};

export const validateAntiBotAnswer = (challenge: AntiBotChallenge, answer: number): boolean => {
    return challenge.expectedSum === answer;
};
