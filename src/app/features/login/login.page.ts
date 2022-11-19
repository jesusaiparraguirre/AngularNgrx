import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { Login } from '../../store/actions/auth.actions';
import { IAppState, selectAuthState } from '../../store/app.states';
import { IState } from '../../store/reducers/auth.reducer';
import { Store } from '@ngrx/store';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
    //providers: [LoginService],
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    user: User = new User();
    loginForm: FormGroup;
    state: Observable<any>;
    error: any;

    constructor(
        private store: Store<IAppState>,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) { 
        this.state = this.store.select(selectAuthState);
    }

    ngOnInit() {
        let user = this.authService.isLogged();
        if(user){
            this.router.navigate(['tasks']);
        }
        this.state.subscribe((s: IState) => {
            this.error = s.error;
        });
        this.initForm();
    }

    initForm() {
        this.loginForm = this.formBuilder.group({
            user: [null,  Validators.compose([Validators.required])],
            password: [null,  Validators.compose([Validators.required])],
        });
    }

    onSubmit() {
        const form = this.loginForm;
        if(form.valid){
            this.store.dispatch(new Login(form.value))
        }
    }

}
