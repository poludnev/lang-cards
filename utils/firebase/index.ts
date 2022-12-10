import { initializeApp } from 'firebase/app';
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCoU6CCiA7Ndoq5x3g3E8z13QyVFNeFb5U',
  authDomain: 'languages-3fb2e.firebaseapp.com',
  projectId: 'languages-3fb2e',
  storageBucket: 'languages-3fb2e.appspot.com',
  messagingSenderId: '631581670606',
  appId: '1:631581670606:web:496d876d8a087de683e49f',
  measurementId: 'G-QSPR6HB358',
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const getDocument = async (
  collectionName: string,
  documentId: string,
): Promise<any> => {
  const docRef = doc(db, collectionName, documentId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log('doc', docSnap.data());
  }
};

export const getAllDocuments = async (collectionName: string) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const result = {};

  querySnapshot.forEach((doc) => {
    result[doc.id] = doc.data();
  });
  return result;
};

export const getDatabyFieldValue = async (
  collectionName: string,
  fieldName: string,
  fieldValue: string,
) => {
  const q = query(collection(db, collectionName), where(fieldName, '==', fieldValue));

  const querySnapshot = await getDocs(q);
  const result = {};

  querySnapshot.forEach((doc) => {
    result[doc.id] = doc.data();
  });
  return result;
};

export const updateDocument = async (
  collectionName: string,
  documentId: string,
  data: any,
) => {
  const docRef = doc(db, collectionName, documentId);

  await updateDoc(docRef, data);
};

export const addDocumentById = async (
  collectionName: string,
  documentId: string,
  data: any,
) => {
  const docRef = doc(db, collectionName, documentId);
  await setDoc(docRef, data);
};
