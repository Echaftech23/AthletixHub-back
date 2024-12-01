import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ExcludePasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data && data.user) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password, ...result } = data.user.toObject();
          return { ...data, user: result };
        }
        return data;
      }),
    );
  }
}
