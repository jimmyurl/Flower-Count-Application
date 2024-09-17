
## Flower Count Application

### Overview

The Flower Count Application is a full-stack solution designed to handle image uploads, process these images to count flowers, and display the results. It consists of two main components:

1. **Frontend**: A React-based user interface where users can upload images and view flower count results.
2. **Backend**: An Express-based server that handles file uploads, processes the images, and provides endpoints for user authentication and image retrieval.

### Frontend

**Technologies Used**: React, Axios, CSS

#### Key Components

1. **FileUpload Component**
   - Allows users to select and upload multiple images.
   - Handles file input and uploads files to the backend server using Axios.

2. **ImageList Component**
   - Displays the uploaded images along with the flower count results returned from the backend.
   - Renders a list of images with their corresponding flower counts.

3. **App Component**
   - Main component that integrates `FileUpload` and `ImageList`.
   - Manages state for storing image data and handles image upload requests.
   - Calls the backend API to process images and updates the UI with the results.

#### CSS Styling

- **General Layout**: Provides a clean, centered layout with a modern look using the Poppins font.
- **File Upload Button**: Styled to be prominent and user-friendly.
- **Image List**: Ensures images and results are displayed neatly.

### Backend

**Technologies Used**: Node.js, Express, Multer, JWT, Bcrypt

#### Key Features

1. **File Upload Handling**
   - Uses Multer to manage file uploads.
   - Saves uploaded images to a directory named `flower_test_images`.

2. **Image Processing**
   - Simulates flower counting for demo purposes. 
   - Returns a mock count of flowers detected in each uploaded image.

3. **User Authentication**
   - Provides a login endpoint for users to authenticate and receive a JWT token.
   - Uses JWT for securing access to certain API endpoints.

4. **Static File Serving**
   - Serves uploaded images so that they can be displayed in the frontend.

#### API Endpoints

- **`POST /login`**: Authenticates a user and provides a JWT token.
- **`POST /process-images`**: Accepts image uploads, processes them, and returns flower count results.
- **`GET /flower_test_images`**: Lists uploaded images (requires JWT authentication).

### How It Works

1. **User Interaction**:
   - On the frontend, users select images using the `FileUpload` component.
   - These images are then uploaded to the backend server.

2. **Backend Processing**:
   - The backend receives the images and saves them using Multer.
   - The `process-images` endpoint simulates flower counting and returns the results.

3. **Displaying Results**:
   - The frontend receives the results and updates the `ImageList` component.
   - Users can view the images along with the flower count data.

### Setup Instructions

#### Frontend

1. Install dependencies using `npm install`.
2. Set up environment variables in `.env`.
3. Start the frontend application using `npm start`.

#### Backend

1. Install dependencies using `npm install`.
2. Create a `.env` file with necessary environment variables (`JWT_SECRET`, `API_KEY`, `PORT`).
3. Start the backend server using `npm start`.

![Alt text](https://github.com/your-username/your-repo/raw/main/path/to/image.png)
