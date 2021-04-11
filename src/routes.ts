import { Router } from "express";

//Import controllers for aplication
import PermissionController from "./controllers/PermissionController";
import FuncionarioController from "./controllers/FuncionarioController";
import RoleController from "./controllers/RoleController";
import SessionController from "./controllers/SessionController";
import UserController from "./controllers/UserController";
import SetorController from "./controllers/SetorController";
import { is } from "./middlewares/permission";

const routes = Router();

// Usuários
routes.post("/users", UserController.store);

// Auth
routes.post("/sessions", SessionController.auth);

// Funcionarios
routes.post("/funcionarios", FuncionarioController.store);
routes.get("/funcionarios", FuncionarioController.index);

// Setores
routes.post("/setores", SetorController.store);
routes.get("/setores", SetorController.index);

// Permissões
routes.post("/permissions", PermissionController.store);
routes.get("/permissions", PermissionController.index);

// Roles
routes.post("/roles", RoleController.store);

export { routes };
