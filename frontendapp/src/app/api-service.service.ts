import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  apiUrl="http://localhost:3000/user";

  constructor(private http:HttpClient) { }

getAllUser() : Observable<any>{
 // console.log("'+apiUrl+'");
  return this.http.get(''+this.apiUrl+'');
}
//create data
createData(data:any):Observable<any>{
  console.log(data,'data created');
  return this.http.post(''+this.apiUrl+'',data);
}
//Delete data
deleteData(id:any):Observable<any>{
  let ids=id;
  console.log(ids);
  return this.http.delete(''+this.apiUrl+'/'+ids+'');
  
}
//Update data
updateData(data:any,id:any):Observable<any>{
  let ids=id;
  console.log(id,data);
  console.log(this.apiUrl)
  return this.http.put(''+this.apiUrl+'/'+ids+'',data);
}
getSingleData(id:any):Observable<any>{
  let ids=id;
  return this.http.get(''+this.apiUrl+'/'+ids+'');
}
};
