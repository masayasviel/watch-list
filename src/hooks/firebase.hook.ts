import { signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth';
import { collection, query, orderBy, addDoc, getDocs, doc, updateDoc } from 'firebase/firestore';
import { uploadString, getDownloadURL, deleteObject, ref } from 'firebase/storage';

import { firebaseAuth, firestore, firebaseStorage } from '../firebase';
import { store, stateSlice } from '../store';
import { RegisterInterface } from '../interfaces/register.interface';
import { fireStorageRef, firestoreCollection } from '../contasts';
import { ListInterface } from '../interfaces/list.interface';
import { UpdateInterface } from '../interfaces/update.interface';

export const login = async (email: string, password: string): Promise<UserCredential> => {
    const credential = await signInWithEmailAndPassword(firebaseAuth, email, password);
    store.dispatch(stateSlice.actions.saveToken({ authentication: true }));
    return credential;
};

export const logout = async (): Promise<void> => {
    await signOut(firebaseAuth);
    store.dispatch(stateSlice.actions.saveToken({ authentication: false }));
};

export const list = async (): Promise<ListInterface[]> => {
    const animeRef = query(
        collection(firestore, firestoreCollection),
        orderBy('kana')
    );
    const docs = await getDocs(animeRef);
    const res = docs.docs.map((e) => {
        const data = e.data();
        return {
            id: e.id,
            title: data.title,
            kana: data.kana,
            thumbnail: data.thumbnail,
        }
    });
    store.dispatch(stateSlice.actions.setList({ animeList: res }));
    return res;
};

export const getImageUri = async (uuid: string) => {
    const imageRef = ref(firebaseStorage, fireStorageRef(uuid));
    return getDownloadURL(imageRef);
};

export const register = async (param: RegisterInterface) => {
    const uuid = crypto.randomUUID();
    const animeRef = collection(firestore, firestoreCollection);
    await addDoc(animeRef, {
        title: param.title,
        kana: param.kana,
        thumbnail: uuid,
    });
    const storageRef = ref(firebaseStorage, fireStorageRef(uuid));
    await uploadString(storageRef, param.thumbnail, 'base64', {contentType: 'image/jpg'});
    await list();
};

export const update = async (id: string, param: UpdateInterface) => {
    const uuid = crypto.randomUUID();
    const animeRef = collection(firestore, firestoreCollection);
    const targetDoc = doc(animeRef, id);
    await updateDoc(targetDoc, {
        title: param.title,
        kana: param.kana,
        thumbnail: uuid,
    });
    const deleteStorageRef = ref(firebaseStorage, fireStorageRef(param.uuid));
    await deleteObject(deleteStorageRef);
    const updateStorageRef = ref(firebaseStorage, fireStorageRef(uuid));
    await uploadString(updateStorageRef, param.thumbnail, 'base64', {contentType: 'image/jpg'});
    await list();
};
