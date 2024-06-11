pipeline {
    agent any
    options {
        // This is required if you want to clean before build
        skipDefaultCheckout(true)
    }
    environment {
        DOCKER_IMAGE_NAME = "ddawst/clininc"
    }
    stages {
        stage("Checkout from github repo"){
            
            steps{
                git url: 'https://github.com/Dat-TG/Clinic-Management.git'
            }
        }
    //     stage('Build') {
    //         steps {
    //             echo 'Running build automation'
    //             bat './gradlew build --no-daemon'
    //             archiveArtifacts artifacts: 'dist/trainSchedule.zip'
    //         }
    //     }
    //     stage('Test') {
    //         steps {
    //             echo 'Running tests with Jest'
    //             bat 'npm install'
    //             bat 'npm test'
    //         }
    //     }
    //     stage('Build Docker Image') {
    //         steps {
    //             script {
    //                 app = docker.build(DOCKER_IMAGE_NAME)
    //             }
    //         }
    //     }
    //     stage('Push Docker Image') {
    //         steps {
    //             script {
    //                 docker.withRegistry('https://registry.hub.docker.com', 'docker_hub_login') {
    //                     app.push("${env.BUILD_NUMBER}")
    //                     app.push("latest")
    //                 }
    //             }
    //         }
    //     }
    //     stage('DeployToProduction') {
    //         steps {
    //             kubeconfig(caCertificate: 'MIIDBjCCAe6gAwIBAgIBATANBgkqhkiG9w0BAQsFADAVMRMwEQYDVQQDEwptaW5pa3ViZUNBMB4XDTI0MDYwNjE1MjIwNVoXDTM0MDYwNTE1MjIwNVowFTETMBEGA1UEAxMKbWluaWt1YmVDQTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAL0/F9QTxaNcSHrujvuk7zX+Wz1opKgM50rtNWQcCeSpvzPFcY+qvnuINd6D3zNuT5MLI6dWCtIIJYhBYja9rIVHTEiuWOAErGnmeXjD/wmYjnG5+8eOgxe5olbT0507WsztOdfyVJ5oj9rP9mCoMZnnKFUHRZlv6AjJZ3ZEEjF5OU12evZAqymuO7jSE+jE8ND9UwnfxknfFgK58LN8vpVE+MwiovuAAbCFSDdTWHlUeD9Avxs7zQ6DP4OhiLXAr4VgqyaHVD7CzvA4W1idFTKIr8V39kDeh3LNmvxsXcEnxfn+G7qXk/qxvX4YcLsapn6n17fPPhPAh77MSGq4IpsCAwEAAaNhMF8wDgYDVR0PAQH/BAQDAgKkMB0GA1UdJQQWMBQGCCsGAQUFBwMCBggrBgEFBQcDATAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBQ5O7dSI40VuA8NRUAKKCWZX4zxWTANBgkqhkiG9w0BAQsFAAOCAQEAOJ6EKqDzmdTM3dv/B+i9BYB+b/a1rKHIat8qK25TJnSVbEJ91MDcionaYxlFBK2CibP712ypli4EtyTXqajdLROvGaUDBvOqSF+gl9TRDDNlEa2FiYss6pCdrI7zqC/VkXfGhrP93dvix+dr+fPrhSmOQnKSHZpfIer8v7N2m7Pw2DjBifgGugxG9EhdGfhlPgE9j06gP7J566Nkvs9gNcI0gppaz9iYx+RP5MQGj8ZHQPYWYu16sgrlwoB9PRyhQws4wbji0H0tDVUs+6Lxaf0boWazYD5BN/Q79TJEiJlBP7XlnRowHsUNj0IId964rlxDFuMwlUusIVR56EHJCA==', credentialsId: 'kubernetes', serverUrl: 'https://127.0.0.1:59046') {
    // // some block
    //              bat 'kubectl apply -f deployment.yaml'
    //              bat 'kubectl apply -f app-service.yaml'
    //              bat 'kubectl rollout restart deployment train-schedule'
    //             }
    //         }
    //     }
    }
}