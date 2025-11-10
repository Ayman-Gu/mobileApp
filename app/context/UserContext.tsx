import React, { createContext, ReactNode } from "react"

export type userContextType={
    fullName:string | null ,
    setFullName: (fullname:string)=>void,
    email:string | null ,
    setEmail: (email:string)=>void,
    password:string | null ,
    setPassword: (fullname:string)=>void,
    code:string | null ,
    setCode: (code:string)=>void
}

export const UserContext=createContext<userContextType>({
    fullName:null,email:null,password:null,code:null,
    setFullName:()=>{},setEmail:()=>{},setPassword:()=>{},setCode:()=>{}
})

export const UserProvider=({children}:{children:ReactNode})=>{

    const [fullName,setFullName]=React.useState<null|string>('')
    const [email, setEmail] = React.useState<null|string>('')
    const [password, setPassword] = React.useState<null|string>('')
    const [code, setCode] = React.useState<null|string>('')



return(
    <>
    <UserContext.Provider 
    value={{fullName, email,password,code,
    setFullName,setEmail,setPassword,setCode}}
    >
        {children}
    </UserContext.Provider>
    </>
)
}
export default UserProvider;
