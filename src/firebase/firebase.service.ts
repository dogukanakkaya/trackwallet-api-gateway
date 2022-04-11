import { getFirestore } from 'firebase-admin/firestore'
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { readFileSync } from 'fs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FirebaseService {
    private app;

    constructor() {
        const serviceAccount = JSON.parse(readFileSync(`${process.cwd()}/serviceAccountKey.json`).toString());

        const firebaseConfig = {
            credential: cert(serviceAccount)
        };

        this.app = initializeApp(firebaseConfig);
    }

    get auth() {
        return getAuth(this.app);
    }

    get firestore() {
        return getFirestore(this.app);
    }
}