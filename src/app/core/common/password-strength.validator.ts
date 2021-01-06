import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";


export const createPasswordStrengthValidator: ValidatorFn = (
    (control: AbstractControl): ValidationErrors | null => {

        const value = control.value;

        if (!value) {
            return null;
        }

        const hasUpperCase = /[A-Z]+/.test(value);
        const hasLowerCase = /[a-z]+/.test(value);
        const hasNumeric = /[0-9]+/.test(value);

        const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;
        return !passwordValid ? { passwordStrenght: true } : null;
    }
)