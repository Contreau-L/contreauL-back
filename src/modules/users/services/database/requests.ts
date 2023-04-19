export const getUserCreationRequest = (): string => {
 return "INSERT INTO \"users\" (name, password, email) VALUES ($1, $2, $3) RETURNING id;";
}

export const getUserFromEmailRequest = (): string => {
 return "SELECT * FROM \"users\" WHERE email = $1";
}

export const getUserPasswordFromEmailRequest = (): string => {
 return "SELECT * FROM \"users\" WHERE email = $1";
}