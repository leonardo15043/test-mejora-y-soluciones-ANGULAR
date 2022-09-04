import { Injectable , EventEmitter} from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot , Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate{
  userAuth = new EventEmitter<boolean>();
  constructor(
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if (localStorage.getItem('token') === null) {
        this.router.navigate(['']);
        this.userAuth.emit(false);
        return false;
      } else {
        this.userAuth.emit(true);
        return true;
      }
  }

}