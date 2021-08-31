import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class HttpHeaderInterceptor implements HttpInterceptor {
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                'x-rapidapi-key': 'b1708e7897mshb8a2250f5ef7665p192066jsnf5492e1e5952',
                'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com',
            },

            setParams: {
                'key': '0f65d33b1ca74371993d0e75b67751a4'
            }
        })
        return next.handle(req);

    }
}
