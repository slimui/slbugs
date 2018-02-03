aws cognito-idp sign-up \
  --region us-east-1 \
  --client-id ENTER_CLIENT_ID \
  --username test@user.com \
  --password Passw0rd! \
  --user-attributes Name="custom:Name",Value="Test User"
