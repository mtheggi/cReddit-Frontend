pipeline {
    agent none
    stages {
        stage('Build & test') {
            agent {
                docker {
                    image 'node:18-alpine'
                    args '-v /home/jenkins/:/usr/src/app/:rw'
                }
            }
            stages{
                stage('build'){
                    steps {
                        sh 'npm install'
                        sh 'npm run build'
                        sh 'cp -r dist /usr/src/app/'
                        // echo 'yes'
                    }
                }
                stage('Test') {
                     steps {
                         echo 'Testing..'
                     }
                }
            }
        }
        
        stage('Deploy') {
            agent any
            when{
                branch 'main'
            }
            steps {
                sh '/home/jenkins/deploy.sh'
                // echo 'help'
            }
        }
    }
}
