Important configuration

Production currently uses:

PUBLIC_URL=https://sign.justiceoncall.ca


REACT_APP_APPID=opensign


REACT_APP_SERVERURL=https://sign.justiceoncall.ca/api/app


SERVER_URL=https://sign.justiceoncall.ca/api/app

SMTP is configured on the server, not the frontend:

SMTP_ENABLE=true
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=<SMTP account>
SMTP_PASS=<SMTP app password>

Important: the SMTP password that appeared in the terminal history earlier should be rotated if it is still active.

Build

From:

cd /mnt/d/OpenSign/OpenSign-staging

Build frontend:

docker compose run --rm client npm run build

Build Docker image:

docker compose build client

Deploy:

docker compose up -d client

Start everything:

docker compose up -d

Check:

docker compose ps

Logs:

docker compose logs -f
Frontend routes

The main routing is in:

apps/OpenSign/src/App.jsx

Important routes include:

/
/login/:base64url
/forgetpassword
/changepassword
/dashboard/:id
/form/:id
/report/:id
/profile
/drive
/managesign
/template/:templateId
/signaturePdf/:docId
/placeHolderSign/:docId
/recipientSignPdf/:docId
/verify-document
/preferences
/success

The password reset route is:

<Route
  path="/forgetpassword"
  element={<Lazy Page={ForgetPassword} />}
/>

The page itself is:

apps/OpenSign/src/pages/ForgetPassword.jsx

It is lazy-loaded, so its JavaScript becomes a separate Vite asset such as:

ForgetPassword-XXXXXXXX.js
If a route suddenly goes to the login/front page

Don't immediately change React Router.

Check the chain:

App.jsx route
      ↓
Lazy import
      ↓
Vite build
      ↓
build/assets/*.js
      ↓
Docker image
      ↓
running container
      ↓
Caddy
      ↓
Cloudflare
      ↓
browser cache

Useful test:

grep -n "forgetpassword" apps/OpenSign/src/App.jsx

Then:

find apps/OpenSign/build/assets \
  -name 'ForgetPassword-*.js' -print

Check the running container:

docker exec OpenSign-container sh -c \
'find /usr/src/app/build/assets -name "ForgetPassword-*.js" -print'

And production:

curl -s https://sign.justiceoncall.ca/forgetpassword \
  | grep -oE 'src="[^"]+\.js[^"]*"' | head
Persistent data

There are two critical categories:

MongoDB:

data-volume

Documents/files:

opensign-files

The file volume is mounted at:

/usr/src/app/files

A source-code backup alone is not a production backup.

You need:

Source/config
+
MongoDB
+
opensign-files
Deployment for a client

A clean client installation should have its own:

Domain
Database
File storage
SMTP credentials
Admin account
Environment configuration
Backups

Do not accidentally point two clients at the same MongoDB/database or document volume.

For your commercial model, I'd describe the $399 CAD as the initial installation/deployment fee, covering things such as:

Deployment
Configuration
Domain setup
SMTP setup
Initial branding
Testing
Production launch

Then keep optional recurring services separate:

Hosting
Backups
Maintenance
Monitoring
Support
Custom development

And importantly, distinguish your installation/service fee from the underlying OpenSign software license and its applicable open-source terms.

Production checklist

Before handing a deployment to a client:

[ ] HTTPS working
[ ] Login working
[ ] Password reset working
[ ] SMTP working
[ ] Document upload working
[ ] Send-for-signature working
[ ] Recipient signing working
[ ] Signed document retrieval working
[ ] MongoDB persistent
[ ] Document storage persistent
[ ] Backup completed
[ ] Restore procedure tested
[ ] Debug code removed
[ ] No secrets committed
[ ] Production credentials rotated
[ ] Cloudflare configured
[ ] Caddy configured