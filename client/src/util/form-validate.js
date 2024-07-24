export const firstNameValidate = {
    required: {
        value: true,
        message: 'First name is required',
    },
    maxLength: {
        value: 50,
        message: 'First name cannot exceed 50 characters',
    },
};

export const lastNameValidate = {
    required: {
        value: true,
        message: 'Last name is required',
    },
    maxLength: {
        value: 50,
        message: 'Last name cannot exceed 50 characters',
    },
};

export const emailValidate = {
    required: {
        value: true,
        message: 'Email is required',
    },
    pattern: {
        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        message: 'Invalid email format',
    },
};

export const usernameValidate = {
    required: {
        value: true,
        message: 'Username is required',
    },
    maxLength: {
        value: 30,
        message: 'Username cannot exceed 30 characters',
    },
};

export const passwordValidate = {
    required: {
        value: true,
        message: 'Password is required',
    },
    minLength: {
        value: 8,
        message: 'Password must be at least 8 characters long',
    },
};
