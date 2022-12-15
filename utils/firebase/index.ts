// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
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
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCoU6CCiA7Ndoq5x3g3E8z13QyVFNeFb5U',
  authDomain: 'languages-3fb2e.firebaseapp.com',
  projectId: 'languages-3fb2e',
  storageBucket: 'languages-3fb2e.appspot.com',
  messagingSenderId: '631581670606',
  appId: '1:631581670606:web:496d876d8a087de683e49f',
  measurementId: 'G-QSPR6HB358',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

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

export const getDatabyFieldValue = async (
  collectionName: string,
  fieldName: string,
  fieldValue: string,
) => {
  const q = query(collection(db, collectionName), where(fieldName, '==', fieldValue));

  const querySnapshot = await getDocs(q);
  const result = {};

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, ' => ', doc.data());
    result[doc.id] = doc.data();
  });
  return result;
};

export const updateDocument = async (
  collectionName: string,
  documentId: string,
  fieldName: string,
  data: any,
) => {
  const docRef = doc(db, collectionName, documentId);

  await updateDoc(docRef, {
    [fieldName]: arrayUnion(data),
  });
};

export const addDocumentById = async (
  collectionName: string,
  documentId: string,
  data: any,
) => {
  const docRef = doc(db, collectionName, documentId);
  await setDoc(docRef, data);
};
