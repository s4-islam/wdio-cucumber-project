pipeline {
    agent any

    environment {
        NODE_HOME = tool name: 'NodeJS'
        PATH = "${NODE_HOME}/bin:${env.PATH}"
    }

    triggers {
        pollSCM('H/5 * * * *')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npx wdio run wdio.conf.js'
            }
        }
    }

    post {
        always {
            sh 'npx allure generate allure-results --clean -o allure-report'
            archiveArtifacts artifacts: 'allure-report/**'
            cleanWs()
        }
    }
}
