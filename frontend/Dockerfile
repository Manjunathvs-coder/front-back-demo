
FROM nginx:stable-alpine

# Optional — set working directory (not strictly needed for nginx)
WORKDIR /app

# Copy your frontend file(s) into the Nginx web root
COPY index.html /usr/share/nginx/html/index.html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
