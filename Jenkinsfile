

// pipeline {
//     agent any

//     environment {
//         IMAGE_NAME = "weather-fe"
//         IMAGE_TAG = "latest"
//     }

//     stages {
//         stage('Checkout') {
//             steps {
//                 git branch: 'main', url: 'https://github.com/Samiriiit/weather.git'
//             }
//         }

//         stage('Install & Build') {
//             steps {
//                 bat 'npm install'
//                 bat 'npm run build'
//             }
//         }

//         // stage('Build Podman Image') {
//         //     steps {
//         //         bat "podman build -t %IMAGE_NAME%:%IMAGE_TAG% ."
//         //     }
//         // }
//          stage('Build Podman Image') {
//             steps {
//                   bat "podman build -t %IMAGE_NAME%:%IMAGE_TAG% ."
//             }
//         }

// //       stage('Run Podman Container ') {
// //    steps {
// //         bat """
// //         REM Check if container exists
// //         podman ps -a --format "{{.Names}}" | findstr /I "%IMAGE_NAME%-container" >nul
// //         IF %ERRORLEVEL%==0 (
// //             podman stop %IMAGE_NAME%-container
// //             podman rm %IMAGE_NAME%-container
// //         ) ELSE (
// //             echo Container not found, skipping
// //         )

// //         REM Run new container
// //         podman run -d -p 3000:3000 --name %IMAGE_NAME%-container %IMAGE_NAME%:%IMAGE_TAG%
// //         """
// //     }
// // }
//     stage('Deploy Pod') {
//         steps {
//             bat 'podman kube play weather-fe.yaml --replace'
//             echo "⚠️ Skipping Service YAML on Windows Podman (NodePort not supported)"
//         }
//     }
//     stage('Run FE Container') {
//     steps {
//         bat """
//         REM Stop old container if exists
//         podman ps -a --format "{{.Names}}" | findstr /I "%IMAGE_NAME%-container" >nul
//         IF %ERRORLEVEL%==0 (
//             podman stop %IMAGE_NAME%-container
//             podman rm %IMAGE_NAME%-container
//         )
//         REM Run new container with port mapping
//         podman run -d -p 32000:3000 --name %IMAGE_NAME%-container %IMAGE_NAME%:%IMAGE_TAG%
//         """
//     }
// }

//         stage('Test') {
//     steps {
//         bat """
//         REM Wait 15 seconds for container to start
//         timeout /t 15 /nobreak >nul

//         REM Check if FE container is responding using PowerShell
//         powershell -Command "try {Invoke-WebRequest http://localhost:32000 -UseBasicParsing} catch {exit 1}"
//         """
//     }
// }
//     }

//     post {
//         success {
//             echo "Next.js FE deployed successfully!"
//         }
//         failure {
//             echo "Deployment failed!"
//         }
//     }
// }


pipeline {
    agent any

    environment {
        FE_IMAGE_NAME = "weather-fe"
        IMAGE_TAG = "latest"
        KUBE_CONTEXT = "weather-app"
    }

    stages {
        stage('Checkout FE') {
            steps {
                git branch: 'main', url: 'https://github.com/Samiriiit/weather.git'
            }
        }

        stage('Build FE Image') {
            steps {
                bat "podman build -t %FE_IMAGE_NAME%:%IMAGE_TAG% ."
            }
        }

        stage('Load FE Image into Kind') {
            steps {
                // Save image as tar
                bat "podman save %FE_IMAGE_NAME%:%IMAGE_TAG% -o weather-fe.tar"
                
                // Load tar into Kind cluster
                bat "kind load image-archive weather-fe.tar --name kind-weather-app"
            }
        }

        stage('Deploy FE to Kind') {
            steps {
                bat "kubectl --context %KUBE_CONTEXT% apply -f weather-fe.yaml"
            }
        }

        stage('Verify FE Deployment') {
            steps {
                bat "kubectl --context %KUBE_CONTEXT% get pods -l app=weather-fe"
                bat "kubectl --context %KUBE_CONTEXT% get svc -l app=weather-fe"
            }
        }
    }

    post {
        success {
            echo "✅ FE deployed successfully to Kind cluster!"
        }
        failure {
            echo "❌ FE deployment failed!"
        }
    }
}
