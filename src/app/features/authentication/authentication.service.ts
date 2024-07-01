import { Injectable, inject } from '@angular/core';
import { LoginInputInterface } from './types/login.interface';
import {
  Auth,
  UserCredential,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { UserInterface } from './types/user.interface';
import { Role } from '@/shared/types/role.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  auth = inject(Auth);
  db = inject(Firestore);

  async login(input: LoginInputInterface): Promise<UserCredential> {
    const res = await signInWithEmailAndPassword(
      this.auth,
      input.email,
      input.password
    );

    const isAdmin = await this.checkIsAdmin(res.user.uid);

    if (isAdmin) {
      return res;
    } else {
      throw new Error('Permission denied');
    }
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  async checkIsAdmin(uid: string): Promise<boolean> {
    const userDoc = await getDoc(doc(this.db, 'users', uid));

    if (userDoc.exists()) {
      const user = userDoc.data() as UserInterface;
      if (user.role === Role.Admin) {
        return true;
      } else {
        throw new Error('Permission denied');
      }
    } else {
      throw new Error('User not found');
    }
  }
}
