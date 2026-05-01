const { port, connection_url, jwt_secret, user_Email, user_Password } = process.env;

module.exports = {
    port,
    connection_url,
    jwt_secret,
    userEmail: user_Email,
    userPassword: user_Password
}   