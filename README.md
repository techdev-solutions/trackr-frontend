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
The best way to run the frontend against a backend locally is to have a HTTP server like nginx running that serves the static files and proxies the requests to the backend. Here is my nginx config:


    server {
        listen       9090;
        server_name  localhost;
        
        location / { 
          root /Users/moritz/workspace/techdev/trackr-frontend;
          index  index.html index.htm;
          try_files $uri $uri/ /index.html;
        }   
        
        location /portal/ {
          proxy_pass http://localhost:8080/;
          proxy_redirect http://localhost:9090/login http://localhost:9090/portal/login;
          proxy_redirect http://localhost:9090/oauth http://localhost:9090/portal/oauth;
          proxy_set_header Host $host:$server_port;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; 
        }   
        
        location /api/ {
          proxy_pass http://localhost:8080/api/;
        }   
    }

Of course you have to change the root path to your location. If you want to test the dist/ just add it to the root path.
Put this in /etc/nginx/sites-available/trackr.conf, then make a symbolic link

    ln -s /etc/nginx/sites-avialable/trackr.conf /etc/nginx/sites-enabled/

And be sure that the sites-enabled are loaded in the nginx.conf. If you start nginx you can find trackr under http://localhost:9090/.
