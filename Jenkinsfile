pipeline {
    agent any

    triggers {
        pollSCM('H/5 * * * *')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Echo package.json') {
            steps {
                sh 'cat package.json'
            }
        }
    }
}
