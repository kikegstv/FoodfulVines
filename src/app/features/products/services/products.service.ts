import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, from, switchMap } from 'rxjs';
import { Product } from '../models/products.model';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { getStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { }

  uploadImage(file: File, path: string): Observable<string> {
    const storage = getStorage();
    const imgRef = ref(storage, path);

    return from(uploadBytes(imgRef, file)).pipe(
      switchMap((snapshot) => from(getDownloadURL(snapshot.ref)))
    );
  }

  createProduct(product: Product, file: File): Observable<any> {
    const filePath = `products/${new Date().getTime()}_${file.name}`;

    // Crear una copia del objeto product para asegurar que sea mutable
    const mutableProduct = { ...product };

    return this.uploadImage(file, filePath).pipe(
      switchMap((downloadURL) => {
        // Usar el objeto mutable
        mutableProduct.imageUrl = downloadURL;
        return from(this.firestore.collection('products').add(mutableProduct));
      })
    );
  }

  getProducts(): Observable<Product[]> {
    return this.firestore.collection<Product>('products').valueChanges({ idField: 'id' });
  }

  updateProduct(product: Product): Observable<void> {
    return from(this.firestore.collection('products').doc(product.id).update(product));
  }

  updateProducts(products: Product[]): Promise<void> {
    const batch = this.firestore.firestore.batch();

    products.forEach((product) => {
      const docRef = this.firestore.collection('products').doc(product.id).ref;
      batch.update(docRef, product);
    });

    return batch.commit();
  }

  deleteProduct(productId: string): Observable<void> {
    return from(this.firestore.collection('products').doc(productId).delete());
  }
}
