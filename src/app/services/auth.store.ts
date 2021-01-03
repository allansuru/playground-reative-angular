import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';
import { map, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpApiService } from './http-api.service';
import { ThrowStmt } from '@angular/compiler';

const AUTH_DATA = "auth_data";

@Injectable({
    providedIn: 'root'
})
export class AuthStore {

    private subject = new BehaviorSubject<User>(null);

    user$: Observable<User> = this.subject.asObservable();

    isLoggedIn$: Observable<boolean>;
    isLoggedOut$: Observable<boolean>;

    constructor(private api: HttpApiService) {

        this.isLoggedIn$ = this.user$.pipe(map(user => !!user));

        this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));

        const user = localStorage.getItem(AUTH_DATA);

        if (user) {
            this.subject.next(JSON.parse(user));
        }

    }

    register(payload: User): Observable<User> {
        return this.api.post('register', payload);
    }


    login(email: string, password: string): Observable<User> {
        return this.api.post<User>("login", { email, password })
            .pipe(
                tap(user => {
                    this.subject.next(user);
                    localStorage.setItem(AUTH_DATA, JSON.stringify(user));
                }),
            );
    }

    logout() {
        this.subject.next(null);
        localStorage.removeItem(AUTH_DATA);
    }
}
