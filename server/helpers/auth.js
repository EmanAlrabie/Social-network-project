import bcrypt from 'bcrypt'


export const hashPassword = (password)=>{
    return new Promise((res, rej)=>{
        bcrypt.genSalt(12, (err, salt)=>{
            if(err){
                rej(err)
            }
            bcrypt.hash(password, salt, (err, result)=>{
                if(err){
                    rej(err)
                }else{
                    res(result) //hash password
                }
            })
        })
    })
}

export const comparePassword = (password, hashedPassword)=>{
    return bcrypt.compare(password, hashedPassword)
}