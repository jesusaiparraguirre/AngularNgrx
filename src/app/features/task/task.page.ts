import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { Store } from '@ngrx/store';
import { IAppState, selectAuthState } from '../../store/app.states';
import { Logout } from 'src/app/store/actions/auth.actions';
import { IState } from 'src/app/store/reducers/auth.reducer';

@Component({
    //providers: [LoginService],
    selector: 'app-task',
    templateUrl: './task.page.html',
    styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {

    @ViewChild('taskinput') taskinput: ElementRef;
    tasks: any = [];
    taskForm: FormGroup;
    i: number = 0;
    state$: Observable<any>;
    user: User;
    error: any;
    isAuthenticated: boolean;
    nameUser: any;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<IAppState>,
    ) {
        this.state$ = this.store.select(state => state.auth); 
     }
    

    ngOnInit() {
        this.initForm();
        this.state$.subscribe((r: IState) => {
            this.user = r.user ? r.user : {};
            this.error = r.error;
            this.isAuthenticated = r.isAuthenticated
        });
        this.nameUser = localStorage.getItem('user');
    }

    initForm() {
        this.taskForm = this.formBuilder.group({
            task: [null,  Validators.compose([Validators.required])],
        });
    }

    onSubmit() {
        const form = this.taskForm;
        if(form.valid){
            this.tasks.push({id: this.i, name:form.value.task, active:false});
            this.taskForm.reset();
            this.taskinput.nativeElement.focus();
            this.i++;
        }
    }

    deleteTask(id: number) {
        console.log(this.tasks);
        console.log(id);
        const taskIndex = this.tasks.findIndex((obj:any) => obj.id === id);
        this.tasks.splice(taskIndex, 1);
      
        return this.tasks;
    }

    logout() {
        this.store.dispatch(new Logout());
    }
      

}
