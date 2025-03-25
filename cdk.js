const cdk = require('aws-cdk-lib');
const lambda = require('aws-cdk-lib').aws_lambda;

const { Stack, Duration } = cdk;

class ClockoutBackendStack extends Stack {
    constructor(scope, id, props) {
        super(scope, id, props);

        // TODO: Define the Lambda function
        const myFunction = new lambda.Function(this, 'SendPushNotification', {
            runtime: lambda.Runtime.NODEJS_22_X,
            handler: 'index.lambdaFunction',
            code: lambda.Code.fromAsset('lambda'),
            timeout: Duration.seconds(10),
        });

        // Define cron
        const rule = new cdk.aws_events.Rule(this, 'Rule', {
            schedule: cdk.aws-events.Schedule.cron({
            minute: '30',
            hour: '16',
            day: '*',
            month: '*',
            year: '*',
            weekDay: '?',
            }),
            timeZone: 'America/Chicago', // Set the desired timezone
        });

        // Add the Lambda function as a target
        rule.addTarget(new cdk.aws_events_targets.LambdaFunction(myFunction));
    }
}

const app = new cdk.App();
new ClockoutBackendStack(app, 'ClockoutBackend');
app.synth();