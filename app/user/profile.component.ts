import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from './auth.service'

@Component({
  templateUrl: 'app/user/profile.component.html',
  styles: [`
    em {float:right; color: #E05C65; padding-left: 10px;}
    .error input { background-color:#E3C3C5 }
    .error ::-webkit-input-placehold { color: #999; }
    .error ::-moz-placeholder { color: #999; }
    .error :-moz-placeholder { color:#999; }
    .error :ms-input-placeholder { color: #999; }
  `]
})
export class ProfileComponent implements OnInit {
       profileForm:FormGroup;
       private firstName: FormControl;
       private lastName: FormControl;

       constructor(private authService:AuthService, private router:Router){
       }

       ngOnInit() {
         this.firstName = new FormControl(this.authService.currentUser.firstName, [Validators.required, Validators.pattern('[a-zA-z].*')]);
         this.lastName = new FormControl(this.authService.currentUser.lastName);
         this.profileForm = new FormGroup({
           firstName: this.firstName,
           lastName: this.lastName
         })
       }

       validateFirstName(){
         return this.firstName.valid || this.firstName.untouched
       }

       validateLastName(){
         return this.lastName.valid || this.lastName.untouched
       }

       saveProfile(formValues){
         if (this.profileForm.valid){
            this.authService.updateCurrentUser(formValues.firstName, formValues.lastName)
            this.router.navigate(['events'])
         }
       }

       cancel(){
         this.router.navigate(['events']);
       }
}