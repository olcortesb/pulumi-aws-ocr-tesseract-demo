import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

// Create an AWS resource (S3 Bucket)
const bucket = new aws.s3.Bucket("my-bucket");

// Create an AWS rol for lambda
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

// Create and layer s3 way
const lambdaLayerTeserat = new aws.lambda.LayerVersion("lambda_layer", {
    compatibleRuntimes: ["nodejs14.x"],
    s3Bucket: 'pulumi-dev-libs',
    s3Key: 'layer.zip',
    layerName: "lambda_layer_tesserat",
});

// Create layer by zip upload way
const lambdaLayerFns = new aws.lambda.LayerVersion("lambda_layer_fns", {
  code: new pulumi.asset.FileArchive('layer4.zip'),
  layerName: "lambda_layer_fns",
  compatibleRuntimes: ["nodejs14.x"],
});

// Create Lambda Functions and asing two layers
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