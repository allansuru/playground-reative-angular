import { Injectable } from '@angular/core';

import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { Lesson } from '../model/lesson';
import { HttpApiService } from './http-api.service';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private apiService: HttpApiService) {

  }


  loadCourseById = (courseId: number) => this.apiService.get<Course>(`courses/${courseId}`)


  loadAllCourseLessons = (courseId: number): Observable<Lesson[]> =>
    this.apiService.get<Lesson[]>('lessons', {
      pageSize: "10000",
      courseId: courseId.toString()
    })



  loadAllCourses = (): Observable<Course[]> => this.apiService.get<Course[]>('courses');

  saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {
    return this.apiService.put(`courses/${courseId}`, changes);
  }


  searchLessons(search: string): Observable<Lesson[]> {
    return this.apiService.get<Lesson[]>('lessons', {
      filter: search,
      pageSize: "100"

    })
  }

}







