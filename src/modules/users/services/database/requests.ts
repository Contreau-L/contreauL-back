export const getUserCreationRequest = (): string => {
 return "INSERT INTO users (id, user_name, password, email) VALUES ($1, $2, $3, $4)";
}

export const getUserFromEmailRequest = (): string => {
 return "SELECT * FROM users WHERE email = $1";
}