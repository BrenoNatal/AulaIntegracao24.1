import { Request, Response } from "express";
import Auth from "../config/auth";
import { serialize } from 'cookie';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const client = await prisma.client.findUnique({
        where: { email: req.body.email },
      });
      if (!client)
        return res.status(404).json({ message: "Usuário não encontrado." });
      const { password } = req.body;
      if (Auth.checkPassword(password, client.hash, client.salt)) {

        const token = Auth.generateJWT(client);
        
        res.cookie('token1', token, { httpOnly: true, sameSite: "strict", secure: true, maxAge: 3600000 }); // Exemplo de configuração de cookie
        

        return res.status(200).json({ email: client.email});
      } else {
        return res.status(401).json({ message: "Senha inválida." });
      }
    } catch (e) {
      return res.status(500).json({ err: e });
    }
  }

  async getDetails(req: Request, res: Response) {
   
    try {
      const cookiesHeader = req.headers.cookie;

      if (cookiesHeader) {
        
        const cookies: {[key: string]:string} = cookiesHeader.split(';').reduce((cookies:any, cookie) => {

          const [key, value] = cookie.trim().split('=');

          cookies[key] = value;
          
          return cookies;
        }, {});
        
        const token = cookies.token1
  
        const payload = Auth.decodeJWT(token);
        const client = await prisma.client.findUnique({ where: { id: payload.sub } });
        
        if (!client)
          return res.status(404).json({ message: "Usuário não encontrado." });
        return res.status(200).json({ client: client });
      }

    } catch (e) {
      return res.status(500).json({ err: e });
    }
  }
}

export default new AuthController();