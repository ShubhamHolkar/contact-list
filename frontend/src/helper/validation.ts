import { EMAIL_PATTERN, PHONE_PATTERN } from ".";
export const rules: any = {
  email: (watch: Function) => {
    return {
      validate: () => {
        const email = watch("email");
        if (EMAIL_PATTERN.test(email)) {
          return null;
        } else {
          return "Invalid Email";
        }
      },
    };
  },
  phone: (watch: Function) => {
    return {
      validate: () => {
        const phone = watch("phone");
        if (PHONE_PATTERN.test(phone.toString())) {
          return null;
        } else {
          return "Invalid Phone Number";
        }
      },
    };
  },
};
