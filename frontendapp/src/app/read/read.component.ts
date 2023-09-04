import { Component } from '@angular/core';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent {
  constructor(private api:ApiServiceService){}
  readUser:any;
  
  ngOnInit():void{
    this.getAlldata();
    };
  
    
    //Delete id
    
    successMsg:any;
    deleteId(id:any){
      console.log(id,"selected Id");
      this.api.deleteData(id).subscribe((res)=>{
        console.log(res,"deleted Id no");
        this.successMsg=res.message;
        this.getAlldata();
        
        });
      }
    
      getAlldata(){
        this.api.getAllUser().subscribe( (res) =>{
          console.log('Get all data',res);
          this.readUser=res.data;
      })
      }
  }


