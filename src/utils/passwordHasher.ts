import bcrypt from "bcrypt"
export const hashPassword = (password: string): Promise<string> => {
    return bcrypt.genSalt(10)
        .then((salt: string) =>
            bcrypt.hash(password,salt)
                .then((hash: string) => hash)
        );
};

export const checkPassword = (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash);
};