import { signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { uploadString, ref } from 'firebase/storage';

import { firebaseAuth, firestore, firebaseStorage } from '../firebase';
import { store, authSlice } from '../store';
import { RegisterInterface } from '../interfaces/register.interface';

export const login = async (email: string, password: string): Promise<UserCredential> => {
    const credential = await signInWithEmailAndPassword(firebaseAuth, email, password);
    store.dispatch(authSlice.actions.saveToken({ authentication: credential }));
    return credential;
};

export const logout = async (): Promise<void> => {
    await signOut(firebaseAuth);
    store.dispatch(authSlice.actions.saveToken({ authentication: null }));
};

export const register = async (param: RegisterInterface) => {
    const uuid = crypto.randomUUID();
    const animeRef = collection(firestore, 'anime');
    await addDoc(animeRef, {
        title: param.title,
        kana: param.kana,
        thumbnail: uuid,
    });
    const storageRef = ref(firebaseStorage, `thumbnail/${uuid}`);
    await uploadString(storageRef, param.thumbnail);
};
