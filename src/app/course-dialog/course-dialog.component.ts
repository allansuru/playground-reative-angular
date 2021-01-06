import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Course } from "../model/course";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import * as moment from 'moment';
import { CoursesService } from '../services/courses.service';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CoursesStore } from '../services/courses.store';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css'],
    providers: [
        LoadingService,
        MessagesService
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
    ) {
        this.course = course;
    }

    ngOnInit(): void {

        if (this.course.id) {
            this.form = this.fb.group({
                description: [this.course.description, Validators.required],
                category: [this.course.category, Validators.required],
                releasedAt: [moment(), Validators.required],
                longDescription: [this.course.longDescription, Validators.required]
            });
            return;
        }
        this.form = this.fb.group({
            description: ['', Validators.required],
            category: ['', Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: ['', Validators.required]
        });
    }

    save() {

        const changes = this.form.value;

        this.coursesStore.saveCourse(this.course.id, changes)
            .subscribe();

        this.dialogRef.close(changes);

    }

    close() {
        this.dialogRef.close();
    }

}
