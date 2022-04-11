import { Injectable } from '@nestjs/common';
import { DecodedIdToken } from 'firebase-admin/auth';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly firebaseService: FirebaseService
    ) { }

    verifySessionCookie(sessionCookie: string): Promise<DecodedIdToken> {
        return this.firebaseService.auth.verifySessionCookie(sessionCookie, true);
    }

    getSessionCookie(token: string): Promise<string> {
        const expiresIn = 60 * 60 * 8 * 1000; // 8 hour

        return this.firebaseService.auth.createSessionCookie(token, { expiresIn });
    }
}