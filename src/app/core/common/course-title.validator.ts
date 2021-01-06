import { AsyncValidatorFn, AbstractControl } from "@angular/forms";
import { CoursesService } from "../../services/courses.service";
import { map, switchMap } from "rxjs/operators";
import { timer } from "rxjs";

export const courseTitleValidator = (courses: CoursesService): AsyncValidatorFn =>
    (control: AbstractControl) =>
        courses.loadAllCourses().pipe(
            map(items => {
                const course = items
                    .find(c => c.description.toLowerCase() === control.value.toLowerCase());

                return course ? { titleExists: true } : null;
            })
        )



