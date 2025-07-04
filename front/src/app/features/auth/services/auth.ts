import { Injectable } from '@angular/core';
import { AuthApi } from '../api/auth.api';
import { Router } from '@angular/router';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { SnackBarService } from '../../../shared/components/snack-bar/snack-bar.service';

@Injectable()
export class Auth {

  
  constructor(
    private authApiService:AuthApi,
    private snackBar:SnackBarService,
    private router:Router,
   ) { }

  private user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null)
  public user$: Observable<User | null> = this.user.asObservable()



  set User(user:User | null) {
    this.user.next(user)
  }

  get User() {
    return this.user.getValue()
   }

  async login(login: Pick<User, 'email' | 'password'>) {
    try {
      const data = await  firstValueFrom(this.authApiService.login(login))
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("userId", String(data.user.id));
      await this.getProfile()
      this.snackBar.open('Успешная авторизация')
      console.log('user', this.User);
      
      this.router.navigate([`${data.user.id}/boards`])
    } catch (error:any) {
      this.snackBar.open(error.error.message)
    }
  }

  async registration(registration: Pick<User, 'email' | 'password'>) {
    try {
      const data = await  firstValueFrom(this.authApiService.registration(registration))
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("userId", String(data.user.id));
      await this.getProfile()
      this.snackBar.open('Успешная регистраация')
      this.router.navigate([`${data.user.id}/boards`])
    } catch (error:any) {
      this.snackBar.open(error.error.message)
    }
   

  }

  async getProfile() {
       const user = await firstValueFrom(this.authApiService.getProfile())
       console.log('user', user);
       
       this.User = user
  }
}
