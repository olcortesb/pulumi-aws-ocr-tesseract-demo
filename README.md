# pulumi-aws-ocr-tesseract-demo

# The prerequisites:
- Pulumi Account: [Link](https://www.pulumi.com/docs/get-started/aws/begin/)
- AWS Account: [Link](https://aws.amazon.com/es/free/?trk=09a4eec3-03b4-4415-9d0b-3c5df0dafd39&sc_channel=ps&s_kwcid=AL!4422!3!453309389698!b!!g!!%2Bamazon%20%2Baws&ef_id=Cj0KCQjw0oyYBhDGARIsAMZEuMsl-mDhZ9BJI6Mkog5xw8zxnj3B450Z4yXBpUVwdKo2axQmoPvP29oaAsyCEALw_wcB:G:s&s_kwcid=AL!4422!3!453309389698!b!!g!!%2Bamazon%20%2Baws&all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all) 

# Tips and Trick

### Update to latest version of Pulumi:
```bash
# for macOs
brew upgrade pulumi 
```

Verify the version

```bash
pulumi version                                       
v3.39.1
```

### Your Pulumi account

Verify you account and view the activity in the live web monitor of Pulumi

```bahs
pulumi whoami                                         
olcortesb
```

The link to live web monitor is in *`pulumi up`* or *`pulumi preview`* commands

```bash
pulumi up

Previewing update (dev)

View Live: https://app.pulumi.com/olcortesb/pulumi-challenge-august-22/dev/previews/...

```