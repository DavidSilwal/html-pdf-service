# HTML to PDF Service

This is a small html-to-pdf service build over nodejs, express, phridge and phantomjs.

## Features:

* URL and HTML Payload requests.

## Start the service

``` 
npm install -g forever
chmod +x ./init.sh && ./init.sh 
```
## On premise installation

```
curl -sL https://deb.nodesource.com/setup_6.x | sudo bash -
sudo apt-get install nodejs htop libfontconfig
git clone https://github.com/kellermanrivero/html-pdf-service.git
cd html-pdf-service/
npm install -g forever
npm install 
```

## Run on startup (init.d)

`cd` first to the folder you cloned the project into (html-pdf-service). Then:

```
sed -i 's%/home/prerender/pdf-generator%'`pwd`'%g' init.d/pdf-service
sudo cp init.d/pdf-service /etc/init.d/pdf-service
sudo chmod +x /etc/init.d/pdf-service 
sudo update-rc.d pdf-service defaults
sudo update-rc.d pdf-service enable
sudo service pdf-service start
```

## Test the service

### Generate PDF from Web Page URL

```  curl localhost:8080?url=http://google.com/ -o test.pdf ```

### Generate PDF from HTML Payload

``` curl -X POST --data "html=<html><body><h1>Hello, I'm a PDF file now</h1></body></html>" localhost:8080 -o test_html.pdf ```

## Version 0.1.0
