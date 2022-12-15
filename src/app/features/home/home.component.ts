import { Component, ChangeDetectorRef, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BusyService } from 'src/app/core/services/busy.service';

import { BracesPrediction } from 'src/app/core/enums/predictions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  private originalImage: ElementRef | null = null;

  @ViewChild('originalImage') set content(content: ElementRef) {

    if(content) {
      this.originalImage = content;
    }
  }

  private myCanvas: ElementRef | null = null;
  @ViewChild('myCanvas') set canvas_content(content: ElementRef) {
    if (content) {
      this.myCanvas = content;
    }
  }

  isBusy: boolean;
  isBusySubscription: Subscription;

  file: File | null = null;
  url: string = undefined;
  alteredImageUrl: any;
	msg: string = "";

  bracesEnum = BracesPrediction;
  predictionResult: BracesPrediction | null;

  private baseUrl: string = 'https://ml.googleapis.com/v1/projects/ninth-park-362413/models/smile_cnn:predict';

  constructor(
    private cdr: ChangeDetectorRef,
    private busyService: BusyService) { }

  ngOnInit(): void {
    this.isBusySubscription = this.busyService.isBusy$.subscribe(busy => {
      this.isBusy = busy;
    });
  }

  ngOnDestroy(): void {
    this.isBusySubscription.unsubscribe();
  }

  getNoImageStyle(imgSource): any {
    if (imgSource) {
      return {
        'border': 'solid',
        'border-color': 'gray'
      }
    }

    return {
      'border': 'solid',
      'border-color': 'gray',
      'min-height': '150px',
      'min-width': '300px'
    }
  }

  fileChanged(event: any) {
    this.selectFile(event)
  }

  selectFile(event: any) { //Angular 11, for stricter type
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
			this.url = <string>reader.result; 
		}

	}

  imageToArray(canvas, context) {
    let result = [];
    for (let y = 0; y < canvas.height; y++) {
      result.push([]);
      for (let x = 0; x < canvas.width; x++) {
        let data = context.getImageData(x, y, 1, 1).data;
        result[y].push([data[0], data[1], data[2]]);
      }
    }

    return result;
  }

  getPredictionData() {

    const myContext: CanvasRenderingContext2D | null = this.myCanvas.nativeElement.getContext("2d");

    let result = this.imageToArray(this.myCanvas.nativeElement, myContext);

    let ret = JSON.stringify(
      {"instances" : [result] }
    )
    return ret
  }

  convertArray(array) {
    return JSON.stringify(array).replace(/\[/g, '{').replace(/\]/g, '}');
  }

  alterImage() {
    let alteredImageUrl: string = this.resizeImage(this.originalImage?.nativeElement);
    this.alteredImageUrl = alteredImageUrl;
    this.cdr.detectChanges();
  }

  resizeImage(imgToResize: any, width: number = 175, height: number = 100) {
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    
    const myContext: CanvasRenderingContext2D | null = this.myCanvas.nativeElement.getContext("2d");
    const context: CanvasRenderingContext2D | null = canvas.getContext("2d");
  
    this.myCanvas.nativeElement.width = width;
    this.myCanvas.nativeElement.height = height;

    canvas.width = width;
    canvas.height = height;

    context?.drawImage(imgToResize, 0, 0, width, height);

    let imgPixels = context?.getImageData(0, 0, width, height);
    let pixelHeight: number = (imgPixels?.height || 0);
    let pixelWidth: number = (imgPixels?.width || 0);
    for(let y: number = 0; y < pixelHeight; y++){
     for(var x = 0; x < pixelWidth; x++){
          var i = (y * 4) * pixelWidth + x * 4;
          var avg = ((imgPixels?.data[i] || 0) + (imgPixels?.data[i + 1] || 0) + (imgPixels?.data[i + 2] || 0)) / 3;
          imgPixels.data[i] = avg;
          imgPixels.data[i + 1] = avg;
          imgPixels.data[i + 2] = avg;
     }
    }
    context?.putImageData(imgPixels, 0, 0, 0, 0, pixelWidth, pixelHeight);
    myContext.putImageData(imgPixels, 0, 0, 0, 0, pixelWidth, pixelHeight);
    return canvas.toDataURL('image/jpeg');
  }

  predict() {

    let access_token = sessionStorage.getItem('access_token')
    let request_data = this.getPredictionData();
    if (access_token) {

      this.busyService.updateIsBusy(true);

      var xhr = new XMLHttpRequest();
      xhr.open('POST', this.baseUrl);
      xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);

      let that = this;
      xhr.onreadystatechange = (e) => {

        that.busyService.updateIsBusy(false);
        if (xhr.readyState === 4 && xhr.status === 200) {
          
          const resp = JSON.parse(xhr.response);
          const pred = resp?.predictions[0]?.dense_1[0];

          if (pred == BracesPrediction.Braces) {
            this.predictionResult = BracesPrediction.Braces;
          } else if (pred == BracesPrediction.NoBraces) {
            this.predictionResult = BracesPrediction.NoBraces;
          } else {
            alert('Automated Diagnostic failed. Please try again.');
          }

        } else if (xhr.readyState === 4 && xhr.status === 401) {
          // Token invalid, so prompt for user permission.
          alert('Invalid Token. Sign in again.')
        }
      };
      xhr.send(request_data);
    } else {
      alert('Invalid Token. Sign in again.')
    }
  }


}
