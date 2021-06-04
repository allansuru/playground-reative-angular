import { CoursesStore } from './../services/courses.store';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../model/course';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  map,
  concatMap,
  switchMap,
  withLatestFrom,
  concatAll, shareReplay, catchError, takeLast, filter, finalize
} from 'rxjs/operators';
import { merge, fromEvent, Observable, concat, throwError, combineLatest, forkJoin } from 'rxjs';
import { Lesson } from '../model/lesson';
import { CoursesService } from '../services/courses.service';
import { LoadingService } from '../loading/loading.service';


interface CourseData {
  course: Course;
  lessons: Lesson[];
}


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements OnInit {
  data$: Observable<CourseData>;


  constructor(private route: ActivatedRoute,
    private coursesService: CoursesService, public courseStore: CoursesStore) { }

  ngOnInit() {

    const courseId = parseInt(this.route.snapshot.paramMap.get("courseId"));
    const course$ = this.coursesService.loadCourseById(courseId)

    const lessons$ = this.courseStore.loadAllCourseLessons(courseId)
      .pipe(
        startWith([]),
        filter(l => l.length > 0)
      );


    this.data$ = combineLatest([course$, lessons$])
      .pipe(
        map(([course, lessons]) => ({
          course,
          lessons
        } as CourseData)),
        tap(console.log)
      );


  }


}











