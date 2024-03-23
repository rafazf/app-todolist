import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private prefix:string;

  constructor() {this.prefix = '' }

  getDataLocal(key:string){
    return localStorage.getItem(this.prefix + key);
  }

  setDataLocal(key:string, data:string){
    return localStorage.setItem(key, data);
  }

  clear(){
    for(let key in localStorage){
      if(key.startsWith(this.prefix)){
        localStorage.removeItem(key);
      }
    }
  }

  setPrefix(prefix:string){
    this.prefix = prefix;
  }

}
