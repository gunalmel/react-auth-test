import jwt from "jsonwebtoken";
import {ObjectID} from 'mongodb';
import {getDbConnection} from '../db';

export const updateUserInfoRoute = {
  path: '/api/users/:userId',
  method: 'put',
  handler: async (req, res)=>{
    const {authorization} = req.headers;
    const {userId} = req.params;

    //to prevent users from persisting arbitrary set of attributes that can be sent by users.
    const updates = ({
      favoriteFood,
      hairColor,
      bio
    }) =>({
      favoriteFood,
      hairColor,
      bio
    })(req.body);

    if (!authorization) {
      return res.status(401).json({message: 'No authorization header sent'});
    }
    //Bearer token
    const token = authorization.split(' ')[1];

    jwt.verify(token , process.env.JWT_SECRET, async (err, decoded)=>{
      if (err) {
        return res.status(401).json({message: 'Unable to verify token'});
      }

      const { id, isVerified } = decoded;
      if(id!==userId){
        return res.status(403).json({message: 'Not allowed to update this user'});
      }
      if(!isVerified) {
        return res.status(403).json({message: 'You must verify your email before updating your profile'});
      }

      const db = getDbConnection('react-auth-db');
      const result = await db.collection('users').findOneAndUpdate(
        {_id: ObjectID(userId)},
        {$set: {info: updates}},
        {returnOriginal: false});
      const {email, info} = result.value;
      jwt.sign(
        {id, email, isVerified, info},
        process.env.JWT_SECRET,
        {expiresIn: '2d'}, (err, token)=>{
        if (err) {
          return res.status(200).json(err);
        }
        res.status(200).json({token});
      });
    });
  }
}
