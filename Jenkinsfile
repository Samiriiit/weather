

// pipeline {
//     agent any
//     stages {
//         stage('Checkout Code') {
//             steps {
//                 git branch: 'main', url: 'https://github.com/Samiriiit/weather.git'
//             }
//         }
//          stage('Cleanup Old Pods & Images') {
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
        AWS_REGION = 'us-east-1'
        ECR = '490196132533.dkr.ecr.us-east-1.amazonaws.com/weather-fe'
        // IMAGE_TAG = "build-${env.BUILD_ID}"
        TAG = 'latest'
        CONTAINER_NAME = "weather-fe"
        CLUSTER_NAME = "weather-cluster"
        SERVICE_NAME = "weather-fe-service"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'aws', url: 'https://github.com/Samiriiit/weather.git'
            }
        }

        stage('Install & Lint') {
            steps {
                sh '''
                npm ci
                '''
            }
        }


        stage('Build Production Bundle') {
            steps {
                sh 'npm run build'
            }
        }

        // stage('Build Docker Image') {
        //     steps {
        //         // sh '''
        //         // aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REPO
        //         // docker build -t $ECR_REPO:$IMAGE_TAG .
        //         // docker tag $ECR_REPO:$IMAGE_TAG $ECR_REPO:latest
        //         // '''
        //         //  sh 'docker build -t $ECR_REPO:$IMAGE_TAG .'
        //         sh 'docker build --build-arg REACT_APP_ENV=prod -t $ECR_REPO:$IMAGE_TAG .'
        //     }
        // }
       stage('Docker Build & Push') {
      steps {
        sh """
          aws ecr get-login-password --region $AWS_REGION \
          | docker login --username AWS --password-stdin $ECR

          docker build -t $ECR:$TAG .
          docker push $ECR:$TAG
        """
      }
    }
        
         stage('k8s deployment') {
            steps {
                sh 'kubectl apply -f weather-fe.yaml'
            }
        }
        // stage('Push to ECR') {
        //     steps {
        //         sh '''
        //         docker push $ECR_REPO:$IMAGE_TAG
        //         docker push $ECR_REPO:latest
        //         '''
        //     }
        // }

        // stage('Deploy to ECS') {
        //     steps {
        //         sh '''
        //         aws ecs update-service \
        //             --cluster $CLUSTER_NAME \
        //             --service $SERVICE_NAME \
        //             --force-new-deployment \
        //             --region $AWS_REGION
        //         '''
        //     }
        // }

       stage('Smoke Test') {
    steps {
        sh '''
            set -e
            echo "🟢 Waiting for pods to be ready..."
            sleep 30
            echo "🟢 Checking all pods in default namespace..."
            kubectl get pods -n default
        '''
    }
}
        stage('Cleanup Workspace') {
            steps {
                cleanWs()
            }
        }
    }

    post {
        success {
            echo "✅ FE Deployment successful - ${IMAGE_TAG}"
        }
        failure {
            echo "❌ Deployment failed!"
        }
        always {
            cleanWs()
        }
    }
}
