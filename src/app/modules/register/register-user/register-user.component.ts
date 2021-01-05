import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthStore } from '../../../services/auth.store';
import { MessagesService } from '../../../messages/messages.service';
import { filter, tap } from 'rxjs/operators';
import { confirmPasswordValidator } from '../../../core/common/confirm-password.validator';
import { createPasswordStrengthValidator } from '../../../core/common/password-strength.validator';


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
      password: ['', [Validators.required, createPasswordStrengthValidator]],
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
