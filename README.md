# HTML to PDF Service

This is a small html-to-pdf service build over nodejs, express, phridge and phantomjs.

## Features:

* URL and HTML Payload requests.

## Start the service

``` 
npm install -g forever
chmod +x ./init.sh && ./init.sh 
```

## Test the service

### Generate PDF from Web Page URL

```  curl localhost:8080?url=http://google.com/ -o test.pdf ```

### Generate PDF from HTML Payload

``` curl -X POST --data "html=<html><body><h1>Hello, I'm a PDF file now</h1></body></html>" localhost:8080 -o test_html.pdf ```

## Version 0.1.0