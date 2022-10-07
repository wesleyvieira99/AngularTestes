import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { Photo } from '../interfaces/photo';

@Injectable()
export class PhotoBoardService {

  constructor(private http: HttpClient){}

  public getPhotos(): Observable<Photo[]> {
    //pegando fotos do backend utilizando endpoint do backend
    return this.http.get<Photo[]>('http://localhost:3000/photos')
      .pipe(map(photos => {
        return photos.map(photo => {
          return { ...photo, description: photo.description.toUpperCase() };
        });
      }))
      .pipe(tap(photos => console.log(photos)))
      .pipe(delay(2000))
  }
}