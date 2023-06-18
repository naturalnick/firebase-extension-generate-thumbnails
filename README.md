### Generate Thumbnails extension

Use this extension to generate thumbnails from videos uploaded to Firebase Storage.

When you upload a file to your specified Cloud Storage bucket, this extension:

-  Detects if the file is a video
-  Checks to see if the video is in the specified directory
-  Takes a screenshot at the desired number seconds into the video
-  Sets the name of the file based on the video filename and a prefix or suffix if provided
-  Stores the generated image (png) in the specified directory in your Storage bucket

You can configure the extension for a specific video aspect ratio. The aspect ratio applies directly to the output of the thumbnail. Videos not matching the specified aspect ratio may result in distorted thumbnails.

### More Details

Coming soon
