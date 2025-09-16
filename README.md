
# Quizmi

Quizmi is a full-stack quiz generator app built with React (frontend) and Express (backend). It uses OpenAI to generate multiple-choice questions (MCQs) for any topic you search.

## Features
- Search for any topic and generate quiz questions using OpenAI
- Select answers and get instant feedback
- Modern UI with Tailwind CSS

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- An OpenAI API key

### Setup
1. Clone the repository:
	```bash
	git clone https://github.com/swan28pande/Quizmi.git
	cd Quizmi/quizmi
	```
2. Install dependencies for both frontend and backend:
	```bash
	npm install
	cd backend && npm install
	```
3. Create a `.env` file in the `backend/` directory and add your GEMINI API key:
	```env
	GEMINI_API_KEY=your_gemini_api_key_here
	```
4. Start the backend server:
	```bash
	cd backend
	node index.js
	```
5. In a new terminal, start the frontend:
	```bash
	npm run dev
	```

## Usage
1. Open [http://localhost:5173](http://localhost:5173) in your browser.
2. Enter a topic in the search bar and click the search button.
3. Answer the generated quiz questions!

## Project Structure
- `src/` - React frontend
- `backend/` - Express backend with OpenAI integration

## License
MIT
