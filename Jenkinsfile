// pipeline {
//     agent any

//     stages {
//         stage('Checkout') {
//             steps {
//                 git branch: 'main', url: 'https://github.com/Samiriiit/weather.git'
//             }
//         }

//         stage('Install Dependencies') {
//             steps {
//                 bat 'npm install'
//             }
//         }

//         stage('Build') {
//             steps {
//                 bat 'npm run build'
//             }
//         }

//         stage('Start') {
//             steps {
//                 bat 'npm start'
//             }
//         }
//     }
// }

pipeline {
    agent any

    environment {
        IMAGE_NAME = "weather-fe"
        IMAGE_TAG = "latest"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Samiriiit/weather.git'
            }
        }

        stage('Install & Build') {
            steps {
                bat 'npm install'
                bat 'npm run build'
            }
        }

        stage('Build Podman Image') {
            steps {
                bat "podman build -t %IMAGE_NAME%:%IMAGE_TAG% ."
            }
        }

      stage('Run Podman Container ') {
   steps {
                // Stop container if exists, ignore errors
                bat "podman stop %IMAGE_NAME%-container 2>nul || echo Container not found, skipping"
                bat "podman rm %IMAGE_NAME%-container 2>nul || echo Container not found, skipping"

                // Run new container
                bat "podman run -d -p 3000:3000 --name %IMAGE_NAME%-container %IMAGE_NAME%:%IMAGE_TAG%"
            }
}

        stage('Test') {
            steps {
                bat "curl http://localhost:3000 || exit 1"
            }
        }
    }

    post {
        success {
            echo "✅ Next.js FE deployed successfully!"
        }
        failure {
            echo "❌ Deployment failed!"
        }
    }
}
