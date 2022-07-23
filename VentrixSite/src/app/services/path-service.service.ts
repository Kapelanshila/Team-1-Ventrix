import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PathService{

  constructor() { }

    //Get Selected Account
    setPath(value : string)
    {
      localStorage.setItem('path',JSON.stringify(value));
    }
  
    //Returns selected Account
    getPath()
    {
      return JSON.parse(localStorage.getItem('path')!);
  
    }
  
    //Clears Account
    clearPath()
    {
      localStorage.removeItem('request');
    } 
     //

     
    //Get Selected Account
    setRequest(value : string)
    {
      localStorage.setItem('request',JSON.stringify(value));
    }
  
    //Returns selected Account
    getRequest()
    {
      return JSON.parse(localStorage.getItem('request')!);
  
    }
  
    //Clears Account
    clearRequest()
    {
      localStorage.removeItem('request');
    } 
     //
}
