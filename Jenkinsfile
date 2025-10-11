

// pipeline {
//     agent any
//     stages {
//         stage('Checkout Code') {
//             steps {
//                 git branch: 'main', url: 'https://github.com/Samiriiit/weather.git'
//             }
//         }
//         stage('Build Image') {
//             steps {
//                 bat 'minikube image build -t weather-fe:latest .'
//             }
//         }
//         stage('Deploy') {
//             steps {
//                 bat 'kubectl apply -f weather-fe.yaml'
//             }
//         }
//      stage('Verify') {
//     steps {
//         sleep(15)
//         bat "kubectl get pods -l app=weather-fe | findstr Running"
//         echo "✅ Pod is Running"
//     }
// }
//     }
//     post {
//         always {
//             echo "=== FINAL STATUS ==="
//             bat 'kubectl get pods -l app=weather-fe'
//             bat 'kubectl get svc -l app=weather-fe'
//         }
//     }
// }

pipeline {
    agent any

    environment {
        IMAGE_NAME = 'weather-fe:latest'
        K8S_APP_LABEL = 'weather-fe'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Samiriiit/weather.git'
            }
        }

        stage('Build Image') {
            steps {
                bat 'podman build -t %IMAGE_NAME% .'
                bat 'kind load podman-image %IMAGE_NAME% --name weather-app'
            }
        }

        stage('Deploy') {
            steps {
                bat 'kubectl apply -f weather-fe.yaml'
            }
        }

        stage('Verify') {
            steps {
                script {
                    timeout(time: 2, unit: 'MINUTES') {
                        waitUntil {
                            def status = bat(
                                script: "kubectl get pods -l app=%K8S_APP_LABEL% -o jsonpath=\"{.items[0].status.phase}\"",
                                returnStdout: true
                            ).trim()
                            return status == "Running"
                        }
                    }
                    echo "✅ Pod is Running"
                }
            }
        }
    }

    post {
        always {
            bat 'kubectl get pods -l app=%K8S_APP_LABEL%'
            bat 'kubectl get svc -l app=%K8S_APP_LABEL%'
        }
    }
}
