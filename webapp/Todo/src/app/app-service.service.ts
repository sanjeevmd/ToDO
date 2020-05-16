import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class AppServiceService {

  constructor(private http: HttpClient) { }

  // gets the url and param
  geturl(path: string, param: any[]) {

    let url_map = environment.services.filter(x => x.code == path);

    // gets the api url from the environment 
    let url = environment.api_url + url_map[0].url;

    if (param) {
      param.forEach(x => {
        url = url + "/" + x;
      });
    }

    // returns url with param
    return url;
  }

  get<T>(url: string, param?: any[]) {

    let urlparam = this.geturl(url, param);
    // generic type of response
    return this.http.get<T>(urlparam);
  }

  post<T>(url: string, body: any){
    
    let urlparam = this.geturl(url, null);
    // generic type of response
    return this.http.post<T>(urlparam,body);
  }

  put<T>(url: string,body:any, param?:any[]){
  
    let urlparam = this.geturl(url, param);
    // generic type of response
    return this.http.put<T>(urlparam,body);
  }

  delete<T>(url: string, param: any[]) {

    let urlparam = this.geturl(url, param);
    // generic type of response
    return this.http.delete<T>(urlparam);
  }
}