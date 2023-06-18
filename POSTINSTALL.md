<!--
This file provides your users an overview of how to use your extension after they've installed it. All content is optional, but this is the recommended format. Your users will see the contents of this file in the Firebase console after they install the extension.

Include instructions for using the extension and any important functional details. Also include **detailed descriptions** for any additional post-installation setup required by the user.

Reference values for the extension instance using the ${param:PARAMETER_NAME} or ${function:VARIABLE_NAME} syntax.
Learn more in the docs: https://firebase.google.com/docs/extensions/publishers/user-documentation#reference-in-postinstall

Learn more about writing a POSTINSTALL.md file in the docs:
https://firebase.google.com/docs/extensions/publishers/user-documentation#writing-postinstall
-->

### See it in action

You can test out this extension right away!

1. Go to your [Storage dashboard](https://console.firebase.google.com/project/${PROJECT_ID}/storage) in the Firebase console.

1. Upload an image file to the bucket: `${param:YOUR_BUCKET}` in the path `${param:VIDEO_PATH}`

1. After the video is fully uploaded, wait a few seconds and the generated image appear in the same bucket at the specified path.

   Note that you might need to refresh the page to see changes.

### Using the extension

You can upload images using the [Cloud Storage for Firebase SDK](https://firebase.google.com/docs/storage/) for your platform (iOS, Android, or Web). Alternatively, you can upload images directly in the Firebase console's Storage dashboard.

Whenever you upload an image file to `${param:YOUR_BUCKET}` in the path `${param:VIDEO_PATH}`, this extension does the following:

-  Detects if the file is a video
-  Checks to see if the video is in the `${param:VIDEO_PATH}` directory
-  Takes a screenshot `${param:TIMESTAMP}` second(s) into the video
-  Sets the name of the file based on the video filename and a prefix or suffix if provided
-  Stores the generated image (png) in the `${param:THUMBNAIL_PATH}` directory in your Storage bucket

### Monitoring

As a best practice, you can [monitor the activity](https://firebase.google.com/docs/extensions/manage-installed-extensions#monitor) of your installed extension, including checks on its health, usage, and logs.
