import { inject } from '@angular/core'
import {
  ResolveFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router'
import { Observable } from 'rxjs/internal/Observable'
import { CourseEntityService } from './services/course-entity.service'
import { filter, first, map, tap } from 'rxjs/operators'

export const coursesResolver: ResolveFn<boolean> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> => {
  const service = inject(CourseEntityService)

  return service.loaded$.pipe(
    tap(loaded => {
      if (!loaded) {
        service.getAll();
      }
    }),
    filter(loaded => !!loaded),
    first()
  )
}
