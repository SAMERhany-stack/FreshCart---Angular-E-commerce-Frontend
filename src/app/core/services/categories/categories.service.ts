import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private httpclient:HttpClient) {
    
    }
    getAllCategories():Observable<any>{
      return this.httpclient.get("https://ecommerce.routemisr.com/api/v1/categories")
     } 
    getSpecificCategories(id:string):Observable<any>{
      return this.httpclient.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
     } 



    };
    