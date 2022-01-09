import { IUserRegister } from "./TypeScript"

export const validRegister = (data: IUserRegister) =>{
   const { name, email, password, cf_password } = data 
    
   let err;

   if (!name){
       return err = "name is required"
   }

   if (!email){
      return err = "email is required"
   }else if(!validateEmail(email)){
       return err = "enter a valid email address"
   }

   if (!password){
     return err = "password is required"
   }else if(password.length < 6){
      return err = "password should be atleast 6 characters"
   }

   if (!cf_password){
         return err = "confirm password your password"
    }else if(cf_password !== password){
        return err = "the two passwords don't match"
    }

    return err
}

export const validImage = (file: File) => {
  let err;

  if (!file){
      return err = "upload an image "
  }

  if (file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png' ){
     return err = "file format is not supported"
  }

  if(file.size > 1024 * 1024 * 5){
    return err = "file format is too large"
  } //5mb


}

export const validPassword = (password: string, cf_password: string) => {
  let err
  
   if(password.length < 6){
     return err = "password should be atleast 6 characters"
  }

  if (!cf_password){
        return err = "confirm password your password"
   }else if(cf_password !== password){
       return err = "the two passwords don't match"
   }

   return err
}

const validateEmail = (email: string) =>{
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};
