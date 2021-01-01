# image-transformation-service
## Description
manipulations like resizing width and height of image, changing image formats, rotating image, cropping image, applying grayscale filter and posterize effect on images

## Demo
  ### Demo Video - Image Transformation
  https://user-images.githubusercontent.com/76835786/103437416-97ecbf80-4c4d-11eb-91f0-49d26c0ab844.mp4

## Images
  ### Original Remote Image
  ![change-format](https://user-images.githubusercontent.com/76835786/103437510-7c35e900-4c4e-11eb-9e85-9a525da578ba.png)
  
  ### After Resizing the Image
  ![Resize](https://user-images.githubusercontent.com/76835786/103437514-85bf5100-4c4e-11eb-943c-47bd366f238a.PNG)
  
  ### After Rotating
  ![Rotate](https://user-images.githubusercontent.com/76835786/103437515-8657e780-4c4e-11eb-9c28-d66235ad5a35.PNG)
  
  ### GrayScale filter
  ![grayscale](https://user-images.githubusercontent.com/76835786/103437513-822bca00-4c4e-11eb-9722-0b443c83cbf2.PNG)
 
## Dependencies
  
  If you have Node 8 (or later) installed, just run:
  
  $ npm install to install the dependencies
  
  $ npm start to start the server
  
  Server will be up and running on http://localhost:8080
  
## Example Link (Assuming server is up and running)  

http://localhost:8080/magic-image/resize-image?url=https://cdn.pixabay.com/photo/2019/11/08/11/56/cat-4611189_960_720.jpg&w=300&h=200

## API Documentation
For details regarding how to use the service, the documentation is stored in folder API_Documentation/

## References
   https://sharp.pixelplumbing.com/
