import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private baseUrl = 'http://localhost:8080/api/images'; // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient) { }

  getAllImages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  uploadImage(imageName: string, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('imageName', imageName);
    formData.append('file', file);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post(`${this.baseUrl}/upload`, formData, { headers });
  }

  downloadImage(imageId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${imageId}`, { responseType: 'arraybuffer' });
  }
}
