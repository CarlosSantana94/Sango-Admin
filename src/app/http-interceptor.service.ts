import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

    private count = 0;

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let modifiedReq = req.clone({
            headers: req.headers.set('idUsuario', 'noLogin'),
        });
        if (localStorage.getItem('uid') !== null) {
            modifiedReq = req.clone({
                headers: req.headers.set('idUsuario', localStorage.getItem('uid')),
            });

        }
        console.log(modifiedReq);
        this.count++;
        return next.handle(modifiedReq).pipe(
            finalize(() => {
                this.count--;
            }));
    }
}
