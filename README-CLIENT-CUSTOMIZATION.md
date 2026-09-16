1\. Change the Client Name

File

apps/OpenSign/src/pages/Preferences.jsx



Find:



const appName = "OpenSign™";



Change it to the client's name.



Example:



const appName = "Justice Document Sign";



If the Preferences page heading contains the application name, change that heading as well.



Example:



<h1>Justice Document Sign Preferences</h1>

Important



The appName variable is used by Preferences-related text and should contain the client's application name.



Do not change document IDs, signing logic, authentication, or PDF-generation code when changing the client name.



2\. Add or Change the Logo and Favicon

Login Logo

File

apps/OpenSign/src/assets/images/login\_img.png



Replace the existing login\_img.png with the client's logo/image.



The Login page uses:



apps/OpenSign/src/pages/Login.jsx



The Forgot Password page uses:



apps/OpenSign/src/pages/ForgetPassword.jsx



The import should be:



import login\_img from "../assets/images/login\_img.png";



Do not change the image variable or surrounding login code.



Copy the Logo into Docker



From PowerShell:



wsl -d Ubuntu -- cp "/mnt/d/OpenSign/OpenSign-staging/apps/OpenSign/src/assets/images/login\_img.png" /tmp/login\_img.png



Then:



wsl -d Ubuntu -- docker cp /tmp/login\_img.png OpenSign-container:/usr/src/app/src/assets/images/login\_img.png



Verify:



wsl -d Ubuntu -- docker exec OpenSign-container sh -lc "ls -lh /usr/src/app/src/assets/images/login\_img.png"

Favicon



Find the favicon configuration:



wsl -d Ubuntu -- docker exec OpenSign-container sh -lc "grep -R -n -a -E 'fev\_Icon|favicon|applogo' /usr/src/app/src /usr/src/app/cloud 2>/dev/null | head -50"



Replace the appropriate favicon asset with the client's favicon.



Do not change unrelated application configuration.



3\. Reset the Password



Use the application's normal password-reset process.



From the Login page:



Forgot Password



Enter the administrator's email address and complete the password-reset instructions.



Do not modify authentication code just to reset a client's password.



Do not delete the user account.



Do not change Parse authentication settings.



4\. Change the Preferences Page

File

apps/OpenSign/src/pages/Preferences.jsx



The client name is controlled by:



const appName = "CLIENT NAME";



Example:



const appName = "Justice Document Sign";



The Preferences heading can also be branded:



<h1>Justice Document Sign Preferences</h1>

Do Not Change



When changing Preferences branding, do not modify:



getTenantDetails

handleSignatureType

handleSave

updatepreferences

signatureTypes

Timezone

DateFormat

Is12HourTime

DownloadFilenameFormat

UseNameAsSender



These are application functions/settings and should remain unchanged unless the client specifically requires a functional change.



Copy Preferences.jsx into Docker



First copy the Windows file into WSL:



wsl -d Ubuntu -- cp "/mnt/d/OpenSign/OpenSign-staging/apps/OpenSign/src/pages/Preferences.jsx" /tmp/Preferences.jsx



Then copy it into the container:



wsl -d Ubuntu -- docker cp /tmp/Preferences.jsx OpenSign-container:/usr/src/app/src/pages/Preferences.jsx



Verify the name:



wsl -d Ubuntu -- docker exec OpenSign-container sh -lc "grep -n 'const appName' /usr/src/app/src/pages/Preferences.jsx"



Expected result:



const appName = "CLIENT NAME";

5\. Change the Drive Page



First locate the Drive page.



Run:



wsl -d Ubuntu -- docker exec OpenSign-container sh -lc "grep -R -n -a -E 'Drive|drive' /usr/src/app/src/pages /usr/src/app/src/components 2>/dev/null | head -80"



Identify the actual Drive page before making changes.



Only change the client-facing branding required on that page.



Do not change:



document storage

document retrieval

authentication

database calls

file upload logic

file download logic

signing logic

document IDs

Copy the Drive Page into Docker



After editing the Drive page, copy it through /tmp.



Example:



wsl -d Ubuntu -- cp "/mnt/d/OpenSign/OpenSign-staging/apps/OpenSign/PATH/TO/DRIVE-FILE.jsx" /tmp/DRIVE-FILE.jsx



Then:



wsl -d Ubuntu -- docker cp /tmp/DRIVE-FILE.jsx OpenSign-container:/usr/src/app/PATH/TO/DRIVE-FILE.jsx



Replace:



PATH/TO/DRIVE-FILE.jsx



with the actual Drive page path.



Build the Application



After completing the client changes:



wsl -d Ubuntu -- docker exec OpenSign-container npm run build



A successful build will show:



✓ built



You may see a warning similar to:



Some chunks are larger than 500 kB after minification.



This is a build warning, not necessarily a build failure.



Do not change chunking or other build configuration just because this warning appears.



Verify the Client Customization



After building, test:



Login

Client logo appears.

Client name appears where expected.

Login works.

Forgot Password

Client logo appears.

Password reset works.

Preferences

Client name appears.

Preferences load normally.

Save still works.

Drive

Client branding appears.

Documents still load.

Upload still works.

Download still works.

Documents



Create a test document and verify:



Document creation works.

Signing works.

Download works.

Printing works.

Client Customization Checklist

&#x20;Change application/client name.

&#x20;Replace login logo.

&#x20;Replace favicon.

&#x20;Verify Forgot Password logo.

&#x20;Set/reset administrator password.

&#x20;Change Preferences branding.

&#x20;Change Drive page branding.

&#x20;Build application.

&#x20;Test Login.

&#x20;Test Forgot Password.

&#x20;Test Preferences.

&#x20;Test Drive.

&#x20;Test creating a document.

&#x20;Test signing a document.

&#x20;Test downloading a document.

&#x20;Test printing a document.

Important Rule



For a new client, make branding changes only unless the client specifically requires a functional change.



Do not modify:



document ID generation

PDF signing logic

authentication

database functions

tenant retrieval

document storage

signature processing



Keep each client's changes limited and repeatable so the same procedure can be used for the next client.

The changes you've been working on are:

App/package name

"name": "Justice Document Sign"

Browser title in index.html

<title>Justice Document Sign</title>

Description

<meta name="description" content="Justice Document Sign — Securely sign and manage documents online." />

PWA name in the manifest:

"short_name": "Justice Document Sign",
"name": "Justice Document Sign"

Logo
Your logo file:

D:\OpenSign\OpenSign-staging\apps\OpenSign\src\assets\images\justice-document-sign-logo.png
Email template — request-email.ts, where you were working on the branded email/logo.

And your current Docker setup is serving:

OpenSign-container
opensign/justice-document-sign:latest

with the application source inside:

/usr/src/app

