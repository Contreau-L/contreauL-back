export const getUserCreationRequest = (): string => {
 return "INSERT INTO \"Users\" (user_name, password, email) VALUES ($1, $2, $3) RETURNING id;";
}

export const getUserFromEmailRequest = (): string => {
 return "SELECT * FROM \"Users\" WHERE email = $1";
}

export const getUserPasswordFromEmailRequest = (): string => {
 return "SELECT password FROM \"Users\" WHERE email = $1";
}