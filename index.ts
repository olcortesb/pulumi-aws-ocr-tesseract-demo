import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

// Create an AWS resource (S3 Bucket)
const bucket = new aws.s3.Bucket("my-bucket");

const iamForLambda = new aws.iam.Role("iamForLambda", {assumeRolePolicy: `{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Action": "sts:AssumeRole",
        "Principal": {
          "Service": "lambda.amazonaws.com"
        },
        "Effect": "Allow",
        "Sid": ""
      }
    ]
  }
  `});

const lambdaLayerTeserat = new aws.lambda.LayerVersion("lambda_layer", {
    compatibleRuntimes: ["nodejs14.x"],
    s3Bucket: 'pulumi-dev-libs',
    s3Key: 'layer.zip',
    layerName: "lambda_layer_tesserat",
});

// const lambdaLayerAxios = new aws.lambda.LayerVersion("lambda_layer_axios", {
//   code: new pulumi.asset.FileArchive('layer3.zip'),
//   layerName: "lambda_layer_axios",
//   compatibleRuntimes: ["nodejs14.x"],
// });

const lambdaLayerFns = new aws.lambda.LayerVersion("lambda_layer_fns", {
  code: new pulumi.asset.FileArchive('layer4.zip'),
  layerName: "lambda_layer_fns",
  compatibleRuntimes: ["nodejs14.x"],
});

const ocr_lambda = new aws.lambda.Function("ocr_lambda", {
    code: new pulumi.asset.AssetArchive({
        ".": new pulumi.asset.FileArchive("./bin/app"),
    }),
    role: iamForLambda.arn,
    handler: "function.handler",
    runtime: "nodejs14.x",
    layers: [ lambdaLayerTeserat.arn, lambdaLayerFns.arn ],
    timeout: 500,
    memorySize: 256,
    environment: {
        variables: {
            foo: "bar",
        },
    },
});

// Export informations about the services
export const bucketName = bucket.id;
export const layers_versions = lambdaLayerTeserat.version;
export const layer_arn = lambdaLayerTeserat.arn;