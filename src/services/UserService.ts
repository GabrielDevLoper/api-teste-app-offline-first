import { UserRepository } from "../repositories/UserRepository";
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { validate } from "class-validator";
import { RoleRepository } from "../repositories/RoleRepository";
import crypto from "crypto";
import aws from "aws-sdk";
import path from "path";

import { v4 as uuid } from "uuid";

class UserService {
  async index(req: Request, res: Response) {
    const userRepository = getCustomRepository(UserRepository);

    const usuarios = await userRepository.find();

    return res.json(usuarios);
  }

  async store(req: Request, res: Response) {
    const { name, email, password, roles } = req.body;
    // @ts-ignore: Unreachable code error
    const { name: nome, data: buffer, mimetype } = req.files.file;
    const s3 = new aws.S3();
    const key = `${uuid()}-${nome}`;

    const userRepository = getCustomRepository(UserRepository);
    const roleRepository = getCustomRepository(RoleRepository);

    const userAlreadyExist = await userRepository.findOne({
      email,
    });

    if (userAlreadyExist) {
      throw new AppError("Usuário ja existe", 400);
    }
    if (process.env.STORAGE_TYPE === "s3") {
      const params = {
        Bucket: "upload-node-react",
        Key: key,
        Body: buffer,
        ACL: "public-read",
        ContentType: mimetype,
      };

      s3.upload(params, async (error, data) => {
        if (error) {
          return res.status(500).send(error);
        }

        const rolesSplit = roles.split(",");

        const existsRoles = await roleRepository.findByIds(rolesSplit);

        const user = userRepository.create({
          name,
          email,
          password,
          roles: existsRoles,
          key,
          url: data.Location,
        });

        await userRepository.save(user);

        return res.status(201).json(user);
      });
    } else {
      // @ts-ignore: Unreachable code error
      let img = req.files.file;
      const urlLocal = path.join(__dirname, "..", "..", "tmp", "uploads", key);

      const rolesSplit = roles.split(",");

      const existsRoles = await roleRepository.findByIds(rolesSplit);

      const user = userRepository.create({
        name,
        email,
        password,
        roles: existsRoles,
        key,
        url: urlLocal,
      });

      await userRepository.save(user);

      await img.mv(urlLocal);

      return res.status(201).json(user);
    }
  }

  async show(req: Request, res: Response) {}

  async update(req: Request, res: Response) {}

  async delete(req: Request, res: Response) {}
}

export default new UserService();
