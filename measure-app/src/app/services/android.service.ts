import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AndroidService {

  constructor() { }

  isAndroid(): boolean {
    const userAgent = navigator.userAgent.toLowerCase();
    console.log(userAgent);
    return (userAgent.indexOf("android") > -1);
  }
}
