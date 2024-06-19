pipeline {
    agent any
    options {
        // This is required if you want to clean before build
        skipDefaultCheckout(true)
    }
    environment {
        DOCKER_IMAGE_NAME = "ddawst/clinic"
        SLACK_CHANNEL = '#clinic-management'
        EMAIL_RECIPIENTS = 'dat13102k2@gmail.com'
    }
    stages {
        stage("Checkout from github repo"){
            
            steps{
                git url: 'https://github.com/Dat-TG/Clinic-Management.git'
            }
        }
        stage('Build and Unit Test') {
            steps {
                echo 'Running build automation'
                bat './gradlew build --no-daemon'
                archiveArtifacts artifacts: 'dist/clinic.zip'
            }
        }
        stage('Start Application') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm start &'
                    } else {
                        bat 'start /B npm start'
                    }
                    // Give the application some time to start
                    sleep(time: 10, unit: 'SECONDS')
                }
            }
        }
        stage('Execute Katalon Tests') {
            steps {
                script {
                    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                        def katalonCmd = '''
                        cd C:\\Users\\PC\\Katalon_Studio_Engine_Windows_64-9.5.0
                        katalonc -noSplash -runMode=console -projectPath="C:\\Users\\PC\\Katalon Studio\\Clinic Management\\Clinic Management.prj" -retry=0 -testSuitePath="Test Suites/Jenkins Test" -browserType="Chrome" -executionProfile="default" -apiKey="ea38acfe-c0a4-439f-953e-0b8ecdd3f85b" --config -proxy.auth.option=NO_PROXY -proxy.system.option=NO_PROXY -proxy.system.applyToDesiredCapabilities=true -webui.autoUpdateDrivers=true
                        '''
                        if (isUnix()) {
                            sh katalonCmd
                        } else {
                            bat katalonCmd
                        }
                    }
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    app = docker.build(DOCKER_IMAGE_NAME)
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'docker_hub_login') {
                        app.push("${env.BUILD_NUMBER}")
                        app.push("latest")
                    }
                }
            }
        }
        stage('Deploy To Production') {
            steps {
                kubeconfig(caCertificate: 'MIIDBjCCAe6gAwIBAgIBATANBgkqhkiG9w0BAQsFADAVMRMwEQYDVQQDEwptaW5pa3ViZUNBMB4XDTI0MDYwNjE1MjIwNVoXDTM0MDYwNTE1MjIwNVowFTETMBEGA1UEAxMKbWluaWt1YmVDQTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAL0/F9QTxaNcSHrujvuk7zX+Wz1opKgM50rtNWQcCeSpvzPFcY+qvnuINd6D3zNuT5MLI6dWCtIIJYhBYja9rIVHTEiuWOAErGnmeXjD/wmYjnG5+8eOgxe5olbT0507WsztOdfyVJ5oj9rP9mCoMZnnKFUHRZlv6AjJZ3ZEEjF5OU12evZAqymuO7jSE+jE8ND9UwnfxknfFgK58LN8vpVE+MwiovuAAbCFSDdTWHlUeD9Avxs7zQ6DP4OhiLXAr4VgqyaHVD7CzvA4W1idFTKIr8V39kDeh3LNmvxsXcEnxfn+G7qXk/qxvX4YcLsapn6n17fPPhPAh77MSGq4IpsCAwEAAaNhMF8wDgYDVR0PAQH/BAQDAgKkMB0GA1UdJQQWMBQGCCsGAQUFBwMCBggrBgEFBQcDATAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBQ5O7dSI40VuA8NRUAKKCWZX4zxWTANBgkqhkiG9w0BAQsFAAOCAQEAOJ6EKqDzmdTM3dv/B+i9BYB+b/a1rKHIat8qK25TJnSVbEJ91MDcionaYxlFBK2CibP712ypli4EtyTXqajdLROvGaUDBvOqSF+gl9TRDDNlEa2FiYss6pCdrI7zqC/VkXfGhrP93dvix+dr+fPrhSmOQnKSHZpfIer8v7N2m7Pw2DjBifgGugxG9EhdGfhlPgE9j06gP7J566Nkvs9gNcI0gppaz9iYx+RP5MQGj8ZHQPYWYu16sgrlwoB9PRyhQws4wbji0H0tDVUs+6Lxaf0boWazYD5BN/Q79TJEiJlBP7XlnRowHsUNj0IId964rlxDFuMwlUusIVR56EHJCA==', credentialsId: 'kubernetes', serverUrl: 'https://127.0.0.1:61838') {
                 bat 'kubectl apply -f deployment.yaml'
                 bat 'kubectl apply -f app-service.yaml'
                 bat 'kubectl rollout restart deployment clinic'
                }
            }
        }
    }
    post {
        always {
            script {
                emailext (
                    subject: "Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                    body: "Build completed with status: ${currentBuild.currentResult}",
                    recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']],
                    to: "${env.EMAIL_RECIPIENTS}"
                )
                slackSend (
                    channel: "${env.SLACK_CHANNEL}",
                    color: (currentBuild.currentResult == 'SUCCESS') ? 'good' : 'danger',
                    message: "Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL}) completed with status: ${currentBuild.currentResult}"
                )
            }
        }
        failure {
            script {
                emailext (
                    subject: "Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' FAILED",
                    body: "Build failed. Check console output at ${env.BUILD_URL}",
                    recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']],
                    to: "${env.EMAIL_RECIPIENTS}"
                )
                slackSend (
                    channel: "${env.SLACK_CHANNEL}",
                    color: 'danger',
                    message: "Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL}) failed."
                )
            }
        }
    }
}