import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  app.get('/filteredimage', async (req, res)=>{

    let {image_url} = req.query

    if(!image_url) return res.status(422).send('Empty Parameter for GET image_url')

    image_url = image_url.toString()

    let filteredPath : string = ''
    
    try {

   // The Url shoud be valid if it contains either http or https protocol, 
   // Image file with jpg extension should be there
   
   
          const isNotValid = (image_url.slice(0,4) !== 'http' && image_url.slice(0,5) !== 'https') || image_url.slice(-3) !== 'jpg'
          
          if(isNotValid) return res.status(422).send('Invalid Get Parameter image_url (no http/https or jpg file')


           filteredPath = await filterImageFromURL(image_url)


          res.status(200).sendFile(filteredPath)

          setTimeout(() => deleteLocalFiles([filteredPath]), 10000) // delete local file after 10 secs

          
      
    } catch (error) {

          console.log(error)
        
          res.status(500).send('Server Processing Image Error')
    } 
    
  })

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();