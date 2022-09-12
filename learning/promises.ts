export const successpromise =new Promise((resolve,errorHandler)=>{
    setTimeout(()=>{
        resolve("promise is successfull!");
    },5000);
})