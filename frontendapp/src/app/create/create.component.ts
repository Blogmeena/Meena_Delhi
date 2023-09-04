import { Component } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
 // userForm!:FormGroup
  constructor(private api:ApiServiceService,private router:ActivatedRoute){}
  errMsg:any;
  successMsg:any;
  getparamid:any;
  userForm = new FormGroup({
    'Fullname': new FormControl('',Validators.required),
    'Email': new FormControl('',Validators.required),
    'Phoneno': new FormControl('',Validators.required)
  })
                                     
  ngOnInit():void{
    this.getparamid=this.router.snapshot.paramMap.get('Id');
    console.log(this.getparamid);
    this.api.getSingleData(this.getparamid).subscribe((res)=>{
      console.log(res,'Selected update data');
      this.userForm.patchValue({
        Fullname:res.data[0].Fullname,
        Email:res.data[0].Email,
        Phoneno:res.data[0].Phoneno
      })
    })
  }
  
  
  
 //add user

  userSubmit(){
    console.log(this.userForm.value);
    if(this.userForm.valid){
       console.log(this.userForm.value);
      this.api.createData(this.userForm.value).subscribe((res)=>{
        console.log(res,'data added successfully'); 
        this.userForm.reset();
        this.successMsg=res.message;               
      })
    }else{
      this.errMsg="All field are required"
    }
  }

  //update data
  updateUser(){
    console.log(this.userForm.value);
    if(this.userForm.valid){
      this.api.updateData(this.userForm.value,this.getparamid).subscribe((res)=>{
        console.log(res,"data updated succ");
        this.userForm.reset();
        this.successMsg=res.message;
      })
    }else{
      this.errMsg='All fields are required'
    }
  }
  

}
