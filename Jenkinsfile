pipeline {
    agent any
    
    environment {
        FRONTEND_IMAGE= "mern-frontend:jenkins"
        BACKEND_IMAGE= "mern-backend:jenkins"
        PORT= "5000"
        MONGO_URI= "mongodb://mongo:27017/notesdb"
    }
    stages {
        stage('Checkout code'){
            steps {
                git url: 'https://github.com/shahfawadkhan/Notes-App-Devops.git' , branch: 'main'
            }
        }

        stage('Prepare .env'){
    steps {
        sh'''
        cat > backend/.env << EOF
PORT=$PORT
MONGO_URI=$MONGO_URI
EOF
        '''
    }
}

        stage('build docker images'){
            steps {
                sh'''
                echo "building backend image..."
                docker build -t $BACKEND_IMAGE ./backend

                echo "building frontend image..."
                docker build -t $FRONTEND_IMAGE ./frontend --build-arg VITE_API_URL=http://localhost:5000/api/notes
                '''
            }
        }

        stage ('run the images with docker compose'){
            steps {
                sh'''
                echo "running docker images with docker compose..."
                docker compose up -d

                echo "showing running containers ..."
                docker ps
                '''
            }
        }
    }
}