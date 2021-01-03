import { Request, Response } from 'express';
import { authenticate, USERS } from "./db-data";
import { User } from '../src/app/model/user';


export function loginUser(req: Request, res: Response) {

  console.log("User login attempt ...");

  const { email, password } = req.body;

  const user = authenticate(email, password);

  if (user) {
    res.status(200).json({ email: user.email });
  }
  else {
    res.status(403).json('Não existe este usuário');
  }

}

export function createUser(req: Request, res: Response) {
  const user: User = req.body;

  console.log("Creating new user", JSON.stringify(user));

  const exist = Object.values(USERS).find((us) => us.email === user.email);

  if (exist) {

    res.status(409).json('Email existente!');
    return;
  }

  const newUsers = [...Object.values(USERS), user];

  Object.assign(USERS, newUsers);

  console.log(USERS);
  setTimeout(() => {
    try {

      res.status(201).json(user);
    } catch (error) {
      res.status(500).json('Erro ao salvar um novo usuário');
    }


  }, 2000);

}
