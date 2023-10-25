Use this extension to generate thumbnails from videos uploaded to Firebase Storage.

When you upload a file to your specified Cloud Storage bucket, this extension:

-  Detects if the file is a video
-  Checks to see if the video is in the specified directory
-  Takes a screenshot at the desired number seconds into the video
-  Sets the name of the file based on the video filename and a prefix or suffix if provided
-  Stores the generated image (png) in the specified directory in your Storage bucket

You can configure the extension for a specific video aspect ratio. The aspect ratio applies directly to the output of the thumbnail. Videos not matching the specified aspect ratio may result in distorted thumbnails.

Please note: Video and image processing requires more memory usage than typical cloud functions. For this reason generating thumbnails for large videos (over 200 MB) may fail if not enough memory is allocated for this function. I recommend at least 1 GB (1024 MB) memory allocation for videos under or around 200 MB.

# Billing

This extension uses other Firebase or Google Cloud Platform services which may have associated charges:

-  Cloud Functions
-  Cloud Storage

Videos with larger file sizes may require a higher memory usage resulting in . You may need to increase the available memory for your function to accomodate processing larger files.

When you use Firebase Extensions, you're only charged for the underlying resources that you use. A paid-tier billing plan is only required if the extension uses a service that requires a paid-tier plan, for example calling to a Google Cloud Platform API or making outbound network requests to non-Google services. All Firebase services offer a free tier of usage. [Learn more about Firebase billing.](https://firebase.google.com/pricing)
