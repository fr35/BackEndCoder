const ADMIN = true
export const verifyRole = (req,res,next) => {
    if(!ADMIN) return res.send({error: "Usuario no autorizado"})
    next()
}