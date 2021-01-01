Image Transformation Service provides following features for manipulating remotely hosted image:

* Resizing image
* Converting images between formats
* Cropping images
* Rotations
* Filters like grayscale, posterization, etc

-------------------------------------------------------------------------------------------->
There is an User Documentation provided on how to use this API service on this path:

    root\API_Documentation\Image_Transformation_Service_API_Documentation.docx
-------------------------------------------------------------------------------------------->

If you have Node 8 (or later) installed, you should be able to just run:

$ npm install
$ npm run develop or npm start

server will be up and running on http://localhost:8080

For a quick demo of Resizing feature you can also use below link:

Demo - Assuming your server is up and running on http://localhost:8080

-> A hosted image

https://cdn.pixabay.com/photo/2019/11/08/11/56/cat-4611189_960_720.jpg

-> Processed by application would give 

http://localhost:8080/magic-image/resize-image?url=https://cdn.pixabay.com/photo/2019/11/08/11/56/cat-4611189_960_720.jpg&w=300&h=200

==============================================================================================================================

Below is the updated project structure with updated/added files/folders marked with * :

```
/                -- repo root
|
|- API_Documentation/       -- Provides guide on usage of API
|  |-Image_Transformation_Service_API_Documentation.docx   -- Documentation docx
|
|- lib/          -- major source code
|  |- ErrorDictionary.js*  -- Error Dictionary to log all custom errors in form of key-value json object
|  |- ImageService.js*  -- Image Service to be called when request occurs for image transformations
|  |- logger.js  -- creates a logger object
|  |- server.js  -- creates an express server, attaches logging and adds routes
|  \- routes.js*  -- route handlers, with /magic-image api route added
|
|- scripts/      -- helper script directory
|  \- npm        -- runs npm inside of docker
|
\- index.js      -- entrypoint that starts the server
\- package.json*      -- added module "axios" to process remote url images

```



