import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Course, sortCoursesBySeqNo, sortCourseByPrice } from '../model/course';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';
import { CoursesService } from './courses.service';


@Injectable({
    providedIn: 'root'
})
export class CoursesStore {

    private subject = new BehaviorSubject<Course[]>([]);

    courses$: Observable<Course[]> = this.subject.asObservable();

    private subjectUser = new BehaviorSubject<string>('Allan');
    userTest$: Observable<string> = this.subjectUser.asObservable();

    constructor(
        private http: HttpClient,
        private courseService: CoursesService,
        private loading: LoadingService,
        private messages: MessagesService) {

        this.loadAllCourses();

    }

    editUserTest(newUser: string): void {
        this.subjectUser.next(newUser);
    }

    loadAllCourses() {

        const loadCourses$ = this.courseService.loadAllCourses()
            .pipe(
                tap(courses => {

                    return this.subject.next(courses);
                })
            );

        this.loading.showLoaderUntilCompleted(loadCourses$)
            .subscribe();

    }

    saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {

        const courses = this.subject.getValue();

        const index = courses.findIndex(course => course.id == courseId);

        const newCourse: Course = {
            ...courses[index],
            ...changes
        };

        const newCourses: Course[] = courses.slice(0);

        newCourses[index] = newCourse;

        this.subject.next(newCourses);


        return this.courseService.saveCourse(courseId, changes);
    }

    filterByCategory(category: string): Observable<Course[]> {
        return this.courses$
            .pipe(
                map(courses => {
                    return courses.filter(course => course.category == category)
                        .sort(sortCourseByPrice);
                }
                )
            )
    }

}
