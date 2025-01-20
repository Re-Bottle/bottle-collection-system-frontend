const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const nameRegex = /^[a-zA-Z]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

export const nameValidation = (
  firstName: string,
  lastName: string
): validationResult => {
  if (!firstName || !lastName) {
    return {
      message: "First name and last name are required.",
      result: false,
    };
  }
  if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
    return {
      message: "Names must contain only letters.",
      result: false,
    };
  }
  return {
    message: "",
    result: true,
  };
};

export const emailValidation = (email: string): validationResult => {
  if (!(email !== undefined && email.length > 5 && emailRegex.test(email))) {
    return {
      message: "Please enter a valid email address.",
      result: false,
    };
  }
  return {
    message: "",
    result: true,
  };
};

export const passwordValidation = (password: string): validationResult => {
  if (!(password !== undefined && passwordRegex.test(password))) {
    return {
      message:
        "Password must be at least 6 characters long, include an uppercase letter, a number, and a special character.",
      result: false,
    };
  }
  return {
    message: "",
    result: true,
  };
};

export const confirmPasswordValidation = (
  password: string,
  confirmPassword: string
): validationResult => {
  if (!(password === confirmPassword)) {
    return {
      message: "Passwords do not match.",
      result: false,
    };
  }
  return {
    message: "",
    result: true,
  };
};

export const deviceValidation = (device: string): validationResult => {
  if (!device) {
    return {
      message: "Please select a device.",
      result: false,
    };
  }
  return {
    message: "",
    result: true,
  };
};

interface validationResult {
  result: boolean;
  message: string;
}
