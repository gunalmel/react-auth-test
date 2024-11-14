import {getDbConnection} from '../db';
import jwt from "jsonwebtoken";
import {CognitoUserAttribute } from 'amazon-cognito-identity-js';
import {CognitoIdentityProviderClient, SignUpCommand} from "@aws-sdk/client-cognito-identity-provider";

export const signUpRoute = {
  path: '/api/signup',
  method: 'post',
  handler: async (req, res) => {
    const {email, password} = req.body;

    const attributes = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email
      })
    ];

    const client = new CognitoIdentityProviderClient({});

    const input = { // SignUpRequest
      ClientId: process.env.AWS_CLIENT_ID, // required
      // SecretHash: "STRING_VALUE",
      Username: email, // required
      Password: password, // required
      UserAttributes: [ // AttributeListType
        { // AttributeType
          Name: "email", // required
          Value: email,
        },
        { // AttributeType
          Name: "name", // required
          Value: email,
        }
      ],
      ValidationData: [
        {
          Name: "email", // required
          Value: email,
        },
      ]
    };
    const command = new SignUpCommand(input);
    client.send(command,async (err, data)=>{
        if (err) {
          res.status(500).json({error: err.message});
        }

        const db = getDbConnection('react-auth-db');

        const startingInfo = {
          hairColor:'',
          favoriteFood:'',
          bio:''
        }

        const result = await db.collection('users').insertOne({email, info: startingInfo});
        const {insertedId} = result;
        jwt.sign({
          id: insertedId,
          isVerified: false,
          email,
          info: startingInfo
        },
          process.env.JWT_SECRET,
          (err, token) => {
            if (err) {
              return res.status(500).json({error: 'Error signing token'});
            }
            res.status(200).json({token});
          });
         res.status(200).json({message: 'User created'});
    });
  }
};
