import {ObjectID} from "mongodb";
import jwt from "jsonwebtoken";
import {getDbConnection} from "../db";
import { CognitoIdentityProviderClient, ConfirmSignUpCommand } from "@aws-sdk/client-cognito-identity-provider"; // ES Modules import

export const verifyEmailRoute = {
  path: "/api/verify-email",
  method: "put",
  handler: async (req, res) => {
    const {email, verificationString} = req.body;

    const client = new CognitoIdentityProviderClient({});
    const input = { // ConfirmSignUpRequest
      ClientId: process.env.AWS_CLIENT_ID, // required
      Username: email, // required
      ConfirmationCode: verificationString, // required
      // ForceAliasCreation: true || false,
      // AnalyticsMetadata: { // AnalyticsMetadataType
      //   AnalyticsEndpointId: "STRING_VALUE",
      // },
      // UserContextData: { // UserContextDataType
      //   IpAddress: "STRING_VALUE",
      //   EncodedData: "STRING_VALUE",
      // },
      // ClientMetadata: { // ClientMetadataType
      //   "<keys>": "STRING_VALUE",
      // },
    };
    const command = new ConfirmSignUpCommand(input);
    console.log('hi');
    await client.send(command, async(err,data)=>{
      if(err){
        console.log(err);
        return res.status(401).json({message: err.message});
      }
      console.log('hi');
      const db = getDbConnection('react-auth-db');
      const result = await db.collection('users').findOneAndUpdate({email}, {$set: {isVerified: true}}, {returnOriginal: false});

      const {_id: id, info = {}} = result.value;

      jwt.sign({id, email, isVerified: true, info}, process.env.JWT_SECRET, {expiresIn: '2d'}, (err, token)=>{
        if (err) {
          return res.status(500).json(err);
        }
        res.status(200).json({token});
      });
    });
  }
}
