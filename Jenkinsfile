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
        bat """
        REM Check if container exists
        podman ps -a --format "{{.Names}}" | findstr /I "%IMAGE_NAME%-container" >nul
        IF %ERRORLEVEL%==0 (
            podman stop %IMAGE_NAME%-container
            podman rm %IMAGE_NAME%-container
        ) ELSE (
            echo Container not found, skipping
        )

        REM Run new container
        podman run -d -p 3000:3000 --name %IMAGE_NAME%-container %IMAGE_NAME%:%IMAGE_TAG%
        """
    }
}

//        stage('Test') {
//     steps {
//         bat """
//         REM Wait 5 seconds for container to start
//         timeout /t 5 /nobreak >nul

//         REM Check if FE container is responding
//         curl http://localhost:3000 || echo "Server not responding" && exit /b 1
//         """
//     }
// }
        stage('Test') {
    steps {
        bat """
        REM Wait 15 seconds for container to start
        timeout /t 15 /nobreak >nul

        REM Check if FE container is responding using PowerShell
        powershell -Command "try {Invoke-WebRequest http://localhost:3000 -UseBasicParsing} catch {exit 1}"
        """
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
