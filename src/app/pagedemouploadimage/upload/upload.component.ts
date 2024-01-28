import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ImageService } from '../../services/image-service.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  imageName: string = '';
  imageFile: File | null = null;
  images: any[] = [];

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.loadImages();
  }

  handleFileInput(event: any): void {
    this.imageFile = event.target.files[0];
  }

  uploadImage(): void {
    if (this.imageFile) {
      this.imageService.uploadImage(this.imageName, this.imageFile)
        .subscribe(() => {
          this.loadImages();
        });
    }
  }

  downloadImage(imageId: number): void {
    this.imageService.downloadImage(imageId)
      .subscribe((data: any) => {
        const blob = new Blob([data], { type: 'image/*' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      });
  }

  private loadImages(): void {
    this.imageService.getAllImages()
      .subscribe((data: any[]) => {
        this.images = data;
      });
  }
}
