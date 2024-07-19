# Project Smile

The Project Smile project provides automated orthodontic assessments. It uses a TensorFlow-based machine learning model to analyze facial images and determine if an individual might need braces, accessible through a demo Angular web application. Although the project is currently a concept exploration, it aims to use images taken with mobile devices to determine if an individual might need braces.

The project consists of a TensorFlow-based machine learning model for image analysis and a proof-of-concept Angular web application that demonstrates the potential user interface and workflow.

## Repository Structure

The repository is organized into two main components:

1. `smiley-data/`: TensorFlow ML project
2. `smiley-face/`: Angular web application

### ML Project (`smiley-data/`)

This directory contains the machine learning component of the project, built with TensorFlow. It includes:

- `notebooks/`: Google Colab notebooks functioning as the ML pipeline:
  1. `1_dataset-exploration.ipynb`: Exploratory data analysis
  2. `2_raw-data-extraction.ipynb`: Web scraping for training data (before and after images)
  3. `3_data-cleaning-and-supplementation.ipynb`: Data preprocessing
  4. `4_brace-image-supplementation.ipynb`: Additional data augmentation
  5. `5_cnn-binary-image-classifier.ipynb`: Model training, validation, and testing

- `.env.example`: Template for environment variables
- `requirements.txt`: Python dependencies

### Web Application (`smiley-face/`)

This directory contains the Angular-based web application that serves as the user interface. Key components include:

- `src/app/core/`: Core functionality (enums and services)
- `src/app/features/`: Main components of the application
- `src/environments/`: Angular environment configurations

## Getting Started

### Prerequisites

- Node.js and npm (for Angular)
- Python 3.x
- TensorFlow 2.x

### Setup

1. Clone the repository:
   ```
   git clone https://github.com/your-username/Project-Smile.git
   cd Project-Smile
   ```

2. Set up the ML environment:
   ```
   cd smiley-data
   pip install -r requirements.txt
   cp .env.example .env
   # Edit .env with your specific configurations
   ```

3. Set up the Angular application:
   ```
   cd ../smiley-face
   npm install
   ```

## Usage

1. Train the ML model:
   - Open the notebooks in `smiley-data/notebooks/` using Google Colab or Jupyter Notebook.
   - Execute the notebooks in order to scrape data, preprocess it, and train the model.

2. Run the Angular application:
   ```
   cd smiley-face
   ng serve
   ```

3. Open a web browser and navigate to `http://localhost:4200` to use the application.
