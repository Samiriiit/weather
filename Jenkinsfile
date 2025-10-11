

pipeline {
    agent any
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Samiriiit/weather.git'
            }
        }
         stage('Cleanup Old Pods & Images') {
            steps {
                echo "🧹 Cleaning up old FE pods and Podman images"
                bat """
                kubectl delete pod -l app=weather-fe --ignore-not-found
                podman container prune -f
                podman image prune -af
                """
            }
        }
        stage('Build Image') {
            steps {
                bat 'minikube image build -t weather-fe:latest .'
            }
        }
        stage('Deploy') {
            steps {
                bat 'kubectl apply -f weather-fe.yaml'
            }
        }
     stage('Verify') {
    steps {
        sleep(15)
        bat "kubectl get pods -l app=weather-fe | findstr Running"
        echo "✅ Pod is Running"
    }
}
    }
    post {
        always {
            echo "=== FINAL STATUS ==="
            bat 'kubectl get pods -l app=weather-fe'
            bat 'kubectl get svc -l app=weather-fe'
        }
    }
}

// pipeline {
//     agent any

//     stages {
//         stage('Checkout Code') {
//             steps {
//                 git branch: 'main', url: 'https://github.com/Samiriiit/weather.git'
//             }
//         }

//         stage('Cleanup Old Pods & Images') {
//             steps {
//                 echo "🧹 Cleaning up old FE pods and Podman images"
//                 bat """
//                 kubectl delete pod -l app=weather-fe --ignore-not-found
//                 podman container prune -f
//                 podman image prune -af
//                 """
//             }
//         }

//         stage('Build Image') {
//             steps {
//                 // Build FE image locally
//                 bat 'podman build -t weather-fe:latest .'
//                 // imagePullPolicy: Never ensures Kubernetes uses this local image
//             }
//         }

//         stage('Deploy') {
//             steps {
//                 bat 'kubectl apply -f weather-fe.yaml'
//             }
//         }

//         stage('Verify') {
//             steps {
//                 sleep(15)
//                 bat 'kubectl get pods -l app=weather-fe | findstr Running'
//                 echo "✅ Pod is Running"
//             }
//         }
//     }

//     post {
//         always {
//             echo "=== FINAL STATUS ==="
//             bat 'kubectl get pods -l app=weather-fe'
//             bat 'kubectl get svc -l app=weather-fe'
//         }
//     }
// }
