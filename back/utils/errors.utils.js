module.exports.signUpErrors = (err) => {
    let errors = { firstname : '', lastname : '' , email: '' , password: ''}
    if(err.message.includes('firstname')) errors.firstname = 'Format du prénom incorrect'
    if(err.message.includes('lastname')) errors.lastname = 'Format du nom incorrect'
    if(err.message.includes('email')) errors.email = "Format de l'email incorrect"
    if(err.message.includes('password')) errors.password = 'Format du mot de passe incorrect'
    if(err.code === 11000 && err.message.includes('email') ) errors.email = 'Cet email est déjà enregistré'
    return errors
}

module.exports.signInErrors = (err) => {
    let errors = {email: '' , password: ''}
    if(err.message.includes('email')) errors.email = "Email incorrect"
    if(err.message.includes('password')) errors.password = 'Mot de passe incorrect'
    return errors
}