import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Course } from "../model/course";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import * as moment from 'moment';

import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';

import { CoursesStore } from '../services/courses.store';
import { courseTitleValidator } from '../core/common/course-title.validator';
import { CoursesService } from '../services/courses.service';
import { tap, filter } from 'rxjs/operators';


const NEW_USER_KEY = 'new-course';


@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css'],
    providers: [
        LoadingService,
        MessagesService,

    ]
})

export class CourseDialogComponent implements OnInit {

    form: FormGroup;

    course: Course;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course: Course,
        private coursesStore: CoursesStore,
        private courseService: CoursesService,
        private messageService: MessagesService
    ) {
        this.course = course;

        this.form = this.fb.group({
            description: [
                '',
                {
                    validators: [Validators.required],
                    asyncValidators: [courseTitleValidator(this.courseService)],
                    updateOn: 'blur'
                }
            ],
            category: ['', Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: ['', Validators.required]
        });
    }

    ngOnInit(): void {

        if (this.course.id) {
            this.form.setValue({ ...this.course });
            return;
        }

        if (localStorage.getItem(NEW_USER_KEY) !== null) {
            this.form.setValue(JSON.parse(localStorage.getItem(NEW_USER_KEY)));
            return;
        }

        this.form.valueChanges.pipe(
            filter(() => this.form.valid)
        ).subscribe((val) => localStorage.setItem(NEW_USER_KEY, JSON.stringify(val)));
    }

    get title() {
        return this.form.get('description');
    }

    save() {
        if (!this.course.id) {
            this.course = { ...this.course, id: Math.floor(Math.random() * 999).toString() }
        }

        const changes = this.form.value;

        this.coursesStore.saveCourse(this.course.id, changes).pipe(
            tap(() => {
                this.messageService.showSuccess('curso cadastrado com sucesso');
                setTimeout(() => {
                    this.dialogRef.close(changes);
                }, 850);
            })
        )
            .subscribe();


        localStorage.removeItem(NEW_USER_KEY);
    }

    close() {
        this.dialogRef.close();
    }

}
