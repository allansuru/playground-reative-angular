import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Lesson } from '../model/lesson';
import { HttpApiService } from './http-api.service';


@Injectable({
    providedIn: 'root'
})
export class CoursesService {

    constructor(private http: HttpClient, private apiService: HttpApiService) {

    }


    loadCourseById = (courseId: number) => this.apiService.get(`courses/${courseId}`)


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
        return this.http.get<Lesson[]>('/api/lessons', {
            params: {
                filter: search,
                pageSize: "100"
            }
        })
            .pipe(
                map(res => res["payload"]),
                shareReplay()
            );
    }




}







