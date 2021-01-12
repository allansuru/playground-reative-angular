import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { CoursesStore } from '../services/courses.store';
import { tap } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(public coursesStore: CoursesStore, private dialog: MatDialog) {

  }

  ngOnInit() {
    this.reloadCourses();
  }

  addCourse() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";
    dialogConfig.data = {
      id: null
    }

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);
  }

  reloadCourses() {

    this.beginnerCourses$ = this.coursesStore.filterByCategory("BEGINNER");


    this.advancedCourses$ = this.coursesStore.filterByCategory("ADVANCED");
  }

  editName(name: string): void {
    this.coursesStore.editUserTest(name);
  }

}


