trackr-frontend
==============
This is the trackr-page frontend. Though named trackr it's actually an app containing trackr. But trackr is most of it, code and featurewise.

Building
--------
You need node, npm installed. From npm you need grunt-cli, bower and karma.

In the main directory run

    grunt test
    grunt dist
    grunt karma:cover

Test will run all tests. dist will create the production package. karma:cover will run some coverage. The coverage report will be placed in reports/coverage.

Running
-------
The best way to run the frontend against a backend locally is to have a HTTP server like nginx running that serves the static files and proxies the requests to the backend.
Here is my nginx config:


    server {
        listen       80;
        server_name  localhost;

        location /api/ {
          proxy_pass http://localhost:8080/;
        }

        location / {
          alias /Users/moritz/workspace/techdev/trackr-frontend/dist/;
          try_files $uri $uri/ index.html =404;
        }

    }

Of course you have to change the root path to your location. If you want to test the dist/ just add it to the root path.
Put this in /etc/nginx/sites-available/trackr.conf, then make a symbolic link

    ln -s /etc/nginx/sites-avialable/trackr.conf /etc/nginx/sites-enabled/

And be sure that the sites-enabled are loaded in the nginx.conf. If you start nginx you can find trackr under http://localhost:9090/.
