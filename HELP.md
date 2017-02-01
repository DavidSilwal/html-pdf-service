# Docker:

# Build the container
```docker build -t as_pdfgenerator .```

# Run the container
```docker run -d -it --name PDFGenerator as_pdfgenerator```

# Run the container with mounted volume
```docker run -d -it --name PDFGenerator -w /usr/src/app -v "$(pwd)/Documents/Repositorios/HTML2PDF Service":/usr/src/app as_pdfgenerator```

# Enter to the container
```docker exec -it PDFGenerator /bin/bash```

# Stop the container
```docker stop PDFGenerator```

# Remove the container
```docker stop PDFGenerator```
