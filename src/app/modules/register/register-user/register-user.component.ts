import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthStore } from '../../../services/auth.store';
import { MessagesService } from '../../../messages/messages.service';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authStore: AuthStore,
    private messageService: MessagesService,
  ) {

    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required, confirmPasswordValidator]]
    }, { updateOn: 'blur' });

  }

  get email() {
    return this.form.get('email');
  }

  ngOnInit(): void {
  }

  onEmailChange(change): void {
    console.log(change)
  }

  register() {
    console.log(this.email.value);
    this.authStore.register(this.form.value).pipe(
      filter(save => !!save.email),
      tap(() => this.messageService.showSuccess('Usuário salvo com sucesso!'))
    ).subscribe()
  }

}

export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  if (!control.parent || !control) {
    return null;
  }

  const password = control.parent.get('password');
  const passwordConfirm = control.parent.get('passwordConfirm');

  if (!password || !passwordConfirm) {
    return null;
  }

  if (passwordConfirm.value === '') {
    return null;
  }

  if (password.value === passwordConfirm.value) {
    return null;
  }

  return { passwordsNotMatching: true };
};