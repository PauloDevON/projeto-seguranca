export const isValidEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
    const numbers = phone.replace(/\D/g, '');
    return numbers.length >= 10 && numbers.length <= 11;
};
