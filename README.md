# React Photo Gallery

A single-page photo gallery application built using React.js that displays images fetched from the Picsum Photos API. The application implements infinite scrolling to dynamically load additional photos as the user reaches the bottom of the page.

## Features

- Photo Gallery:Displays photos in a clean, single-column layout.
- Picsum API Integration: Fetches paginated photo data from the Picsum Photos API.
- Infinite Scrolling:\*\* Automatically fetches the next page when the user scrolls near the bottom of the page.
- Dynamic Data Loading: Appends newly fetched photos to the existing gallery without removing previously loaded photos.
- Photo Details: Displays each photo using its `download_url` along with the photographer's `author` name.
- Like Functionality: Each photo has a Font Awesome thumbs-up icon with a like count initialized to zero.
- Interactive Likes: Increments the like count each time the thumbs-up icon is clicked.
- End-of-Feed Handling: Stops fetching additional pages when the API returns an empty response.
- Responsive Styling: Uses CSS to create a clean gallery layout similar to the provided assignment reference.

## Technologies Used

- React.js
- JavaScript (ES6+)
- HTML5
- CSS3
- Vite
- Picsum Photos API
- Font Awesome

## API Integration

The application uses the Picsum Photos paginated JSON API.

Example endpoints:

```text
https://picsum.photos/v2/list?page=1
https://picsum.photos/v2/list?page=2
https://picsum.photos/v2/list?page=3
```

The application retrieves the following fields from the API response:

- `download_url` – Used to display the photo.
- `author` – Used to display the photo author's name.

The page number is incremented to fetch additional photos as the user scrolls.

## Getting Started

### Prerequisites

Install Node.js and npm before running the application.

### Installation

Clone the repository:

```bash
git clone https://github.com/0628-rian/photo-gallery.git
```

Navigate to the project directory:

```bash
cd photo-gallery
```

Install the project dependencies:

```bash
npm install
```

### Run the Application

Start the Vite development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal, usually:

```text
http://localhost:5173/
```

## How It Works

1. The application initially fetches photos from the first API page.
2. The retrieved photos are displayed along with their author names.
3. Each photo has an independent like count initialized to zero.
4. Clicking the thumbs-up icon increases the corresponding photo's like count.
5. When the user reaches near the bottom of the page, the next API page is fetched.
6. Newly retrieved photos are appended to the existing gallery.
7. The process continues until the API returns an empty response.

## Notes

- Photos are fetched dynamically from the Picsum Photos API.
- Like counts are managed using React state and are not persisted after a page refresh.
- An active internet connection is required to retrieve photos from the API.

## Author

Developed as a React.js Photo Gallery assignment.
