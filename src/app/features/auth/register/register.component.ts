import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserFacade } from '../../../facades/user.facade';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{

  registerForm!: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        private _userFacade: UserFacade
    ) { }

    ngOnInit() {
        this.registerForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required]
        });
    }

    register() {
        if (this.registerForm.invalid) { return; }

        const { email, password, firstName, lastName } = this.registerForm.value;
        const displayName: string = `${firstName} ${lastName}`;
        this._userFacade.createUser( {email, password, displayName });
    }

}
