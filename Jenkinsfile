

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


// pipeline {
//     agent any

//     environment {
//         FE_IMAGE_NAME = "weather-fe"
//         IMAGE_TAG = "latest"
//         KUBE_CONTEXT = "weather-app"
//     }

//     stages {
//         stage('Checkout FE') {
//             steps {
//                 git branch: 'main', url: 'https://github.com/Samiriiit/weather.git'
//             }
//         }

//         stage('Build FE Image') {
//             steps {
//                 bat "podman build -t %FE_IMAGE_NAME%:%IMAGE_TAG% ."
//             }
//         }

//         stage('Load FE Image into Kind') {
//             steps {
//                 // Save image as tar
//                 bat "podman save %FE_IMAGE_NAME%:%IMAGE_TAG% -o weather-fe.tar"
                
//                 // Load tar into Kind cluster
//                 bat "kind load image-archive weather-fe.tar --name weather-app"
//             }
//         }

//         stage('Deploy FE to Kind') {
//             steps {
//                 bat "kubectl --context %KUBE_CONTEXT% apply -f weather-fe.yaml"
//             }
//         }

//         stage('Verify FE Deployment') {
//             steps {
//                 bat "kubectl --context %KUBE_CONTEXT% get pods -l app=weather-fe"
//                 bat "kubectl --context %KUBE_CONTEXT% get svc -l app=weather-fe"
//             }
//         }
//     }

//     post {
//         success {
//             echo "✅ FE deployed successfully to Kind cluster!"
//         }
//         failure {
//             echo "❌ FE deployment failed!"
//         }
//     }
// }

// pipeline {
//     agent any

//     environment {
//         FE_IMAGE_NAME = "weather-fe"
//         IMAGE_TAG = "latest"
//         CLUSTER_NAME = "weather-app"
//     }

//     stages {
//         stage('Checkout FE') {
//             steps {
//                 git branch: 'main', url: 'https://github.com/Samiriiit/weather.git'
//             }
//         }

//         stage('Build FE Image') {
//             steps {
//                 bat "podman build -t %FE_IMAGE_NAME%:%IMAGE_TAG% ."
//             }
//         }

//         stage('Load FE Image into Kind') {
//             steps {
//                 script {
//                     // Save Podman image as tar archive
//                     bat "podman save %FE_IMAGE_NAME%:%IMAGE_TAG% -o weather-fe.tar"
                    
//                     // Manual import into Kind node using Podman
//                     bat "podman cp weather-fe.tar weather-app-control-plane:/weather-fe.tar"
//                     bat "podman exec weather-app-control-plane ctr image import /weather-fe.tar"
//                     bat "podman exec weather-app-control-plane rm /weather-fe.tar"
                    
//                     // Clean up local tar file
//                     bat "if exist weather-fe.tar del weather-fe.tar"
                    
//                     echo "✅ Image successfully loaded into Kind cluster"
//                 }
//             }
//         }

//         stage('Deploy FE to Kind') {
//             steps {
//                 bat "kubectl apply -f weather-fe.yaml"
//             }
//         }

//         stage('Verify FE Deployment') {
//             steps {
//                 script {
//                     // Wait for deployment to be ready
//                     bat "kubectl wait --for=condition=available deployment/weather-fe --timeout=120s || echo 'Continue verification'"
                    
//                     // Check resources
//                     bat "kubectl get deployment weather-fe"
//                     bat "kubectl get pods -l app=weather-fe"
//                     bat "kubectl get svc weather-fe-service"
                    
//                     // Check pod status and logs
//                     bat "kubectl describe pods -l app=weather-fe || true"
//                     bat "kubectl logs -l app=weather-fe --tail=10 || echo 'Logs not available yet'"
//                 }
//             }
//         }

//         // stage('Smoke Test') {
//         //     steps {
//         //         script {
//         //             // Simple internal cluster test without port forwarding
//         //             bat "kubectl exec deployment/weather-fe -- curl -I http://localhost:3000 || echo 'Internal curl test completed'"
                    
//         //             // Alternatively, check if pod is responding internally
//         //             bat "kubectl run smoke-test --image=curlimages/curl --rm -it --restart=Never -- curl -I http://weather-fe-service:80 || echo 'Service connectivity test completed'"
//         //         }
//         //     }
//         // }
//     }

//     post {
//         always {
//             // Cleanup any temporary files
//             bat "if exist weather-fe.tar del weather-fe.tar"
//             echo "Build ${currentBuild.result} - ${currentBuild.fullDisplayName}"
//         }
//         success {
//             echo "✅ FE deployed successfully to Kind cluster!"
//             echo "Application is running internally in the cluster"
//             echo "Use 'kubectl port-forward svc/weather-fe-service 3000:80' to access locally"
//         }
//         failure {
//             echo "❌ FE deployment failed!"
//             // Debugging commands
//             bat "kubectl describe deployment weather-fe || true"
//             bat "kubectl describe pods -l app=weather-fe || true"
//             bat "kubectl logs -l app=weather-fe --tail=20 || true"
//             bat "kubectl get events --sort-by='.lastTimestamp' || true"
//         }
//     }
// }



// pipeline {
//     agent any
//     environment {
//         FE_IMAGE_NAME = "weather-fe"
//         FE_IMAGE_TAG = "latest"
//         CLUSTER_NAME = "weather-app"
//     }
//     stages {
//         stage('Checkout FE') {
//             steps {
//                 git branch: 'main', url: 'https://github.com/Samiriiit/weather.git'
//             }
//         }
//         stage('Build FE Image') {
//             steps {
//                 bat "podman build -t %FE_IMAGE_NAME%:%FE_IMAGE_TAG% ."
//             }
//         }
//         stage('Load FE Image into Kind') {
//             steps {
//                 script {
//                     bat "podman save %FE_IMAGE_NAME%:%FE_IMAGE_TAG% -o weather-fe.tar"
//                     bat "podman cp weather-fe.tar weather-app-control-plane:/weather-fe.tar"
//                     bat "podman exec weather-app-control-plane ctr image import --base-name docker.io/library/weather-fe /weather-fe.tar"
//                     bat "podman exec weather-app-control-plane rm /weather-fe.tar"
//                     bat "del weather-fe.tar"
//                 }
//             }
//         }
//         stage('Deploy FE to Kind') {
//             steps {
//                 bat "kubectl apply -f weather-fe.yaml"
//             }
//         }
//         stage('Verify FE Deployment') {
//             steps {
//                 script {
//                     sleep(60) // Wait 1 minute
//                     def status = bat(script: "kubectl get pods -l app=weather-fe -o jsonpath='{.items[0].status.phase}'", returnStdout: true).trim()
//                     if (status == "Running") {
//                         echo "✅ FE deployed successfully!"
//                     } else {
//                         error "❌ FE deployment failed! Status: $status"
//                     }
//                 }
//             }
//         }
//     }
//     post {
//         always {
//             bat "if exist *.tar del *.tar"
//         }
//     }
// }

pipeline {
    agent any
    stages {
        stage('Start Minikube') {
            steps {
                bat 'minikube start --force'
            }
        }
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Samiriiit/weather.git'
            }
        }
        stage('Build Image in Minikube') {
            steps {
                bat '@FOR /f "tokens=*" %i IN (\'minikube docker-env --shell cmd\') DO @%i && docker build -t weather-fe:latest .'
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                bat 'kubectl apply -f weather-fe.yaml'
            }
        }
        stage('Verify Deployment') {
            steps {
                script {
                    sleep(20)
                    def status = bat(script: "kubectl get pods -l app=weather-fe -o jsonpath='{.items[0].status.phase}'", returnStdout: true).trim()
                    if (status == "Running") {
                        echo "✅ SUCCESS: FE is running!"
                    } else {
                        error "❌ FAILED: Pod status - ${status}"
                    }
                }
            }
        }
    }
}