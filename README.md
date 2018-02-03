# :bug: slbugs (Serverless Bug Tracker - Currently Under Construction)

## Features

1. React + React Router + Styled Components
2. GraphQL (Apollo Client & apollo-lambda)
3. Authentication with Cognito + IAM + API Gatway
4. DynamoDB
5. Lambda + API Gateway
6. CloudFront CDN

# Demo

[Demo @ slbugs.com](http://app.slbugs.com)

# Instructions (local use)

### 1. Install packages.

```
npm i -g serverless
pip install awscli
```

### 2. Create an AWS Cognito User Pool.

1. Navigate to the AWS Cognito, select <b>Manage your user pools</b> then and click <b>Create a user pool</b>.
2. Enter a pool name and click <b>Step Through Settings</b>.
3. Select <b>Email address or phone number</b> and then <b>Allow email addresses</b>. Scroll down and click <b>Add custom attribute</b>. Type in "Name" as the Name as click <b>Next step</b>.
4. Most other settings will remain as the default, so, on the left click <b>App clients</b>, then <b>Add an app client</b>. Enter in a client name, like "website-app-client", and deselect <em>Generate client secret</em>, then click <b>Create app client</b>.
5. On the left, select Review, and at the bottom of the page click <b> Create pool</b>.

### 3. Edit configuration files

<b>This step assumes you have configured your awscli with your credentials.</b>

1. In the `client/src/auth/config.js` file, update the cognito object to match your region, user pool id, and app client id.
2. In the `backend/cognito` folder, update the `create-test-user.sh` file with the correct `client-id` from your user pool app client. Then, update the `confirm-test-user.sh` file with the correct `user-pool-id` from your user pool.
3. in the `backend/` folder, run `yarn create-user`. You should see results like in the image below. If you check you User Pool in the AWS Console, you should see a newly confirmed user with the custom:Name as "Test User" and email as "test@user.com".
4. In `seed_data/`, edit the userId value to reflect the <em>UserSub</em> that was returned in step 3. This step ensures that when running dynamodb local, the users.json file will correctly mimic the dynamoDB table that references a particular user on login.

### 4. Run Locally

If you haven't already, navigate to both the `client` and `backend` folders and run `npm install` or `yarn install`.

Next, run `yarn start` in both the `backend/` and `client/` folders.

Once both services are running, in your browser, navigation to `localhost:3000/login` and login with `test@user.com/Passw0rd!` (info in the `create-user.sh` file.

You should be redirected to the home page and you can begin adding projects and bugs!

# DynamoDB Shell

(under construction)

# Deploy to Staging

add the postconfirm trigger to the cognito group
(under construction)

### To Do List (order not important)

1. S3 Uploads for attachments (direct request to s3 or through graphQL?)
2. CodePipeline Frontend Deployment Strategy
3. SQS + DynamoDB Triggers in replace of multiple manual writes (project creation/deletion)
4. Custom Email Project Invite through SES and Google G Suite/AWS Workmail
5. Upgrade Graphql RefetchQueries to OptimisticUI to reduce dynamoDB requests
6. Fine Tune Error Handling
7. Change Bug Status/User-Project Privileges
8. Assign Bugs to users
9. Fix Lambda IAM permissions
10. Prevent multiple POST requests (disable submit buttons when waiting for response)
11. User Profile
12. Implement sign requests to use cognito group IAM policies when sending http requests (in the apollo link network layer)
13. Pagination/Query String Parameters/Filter by status/item-type
14. Error handling for already activated accounts
15. Add orgId as HASHkey, projectId GSI?
16. Project Favorite capabilities.

## Create Cloudfront CDN

(under construction)

## Learning Resources

Here is a list of repo's and courses where I learned about the features listed above.

* [Ben Awad's Course Slack Clone React/GraphQL Tutorial](https://www.youtube.com/watch?v=0MKJ7JbVnFc&list=PLN3n1USn4xlkdRlq3VZ1sT6SGW0-yajjL)
* [Serverless Graphql React Starter Kit](https://github.com/serverless/serverless-graphql)
* [A Cloud Guru Serverless Courses](acloud.guru)
* [Serverless Framework Docs/Forums](serverless.com)
