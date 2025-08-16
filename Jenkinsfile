pipeline {
    agent any

    tools {
        nodejs "NodeJS"   // 👈 Make sure you configured NodeJS in Jenkins Global Tool Config with name "NodeJS"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Test') {
            steps {
                bat 'npm run test'
            }
        }

        stage('Start App') {
            steps {
                bat 'npm run start'
            }
        }
    }
}
