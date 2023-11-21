import express from 'express';

import { RoleService } from '../../app/services/roleService';
import { UserService } from '../../app/services/userService';
import { RoleRepositoryImpl } from '../../infrastructure/repositories/roleRepositoryImpl';
import { UserRepositoryImpl } from '../../infrastructure/repositories/userRepositoryImpl';
import { RoleController } from '../controllers/roleController';
import { UserController } from '../controllers/userController';
import { AuthService } from '../../app/services/authService';
import { AuthController } from '../controllers/authController';

import { EncryptImpl } from '../../infrastructure/utils/encrypt.jwt';
import { RedisCacheService } from '../../infrastructure/cache/cache';

const encrypt = new EncryptImpl();

const redisCacheService = new RedisCacheService();

const roleRepository = new RoleRepositoryImpl();
const roleService = new RoleService(roleRepository);
const roleController = new RoleController(roleService);

const userRepository = new UserRepositoryImpl();
const userService = new UserService(userRepository, roleRepository, redisCacheService);
const userController = new UserController(userService);
/*
const permissionRepository = new PermissionRepositoryImpl();
const permissionService = new PermissionService(permissionRepository, roleRepository);
const permissionController = new PermissionController(permissionService);
*/
const authService = new AuthService(userRepository, encrypt/*, redisCacheService*/);
const authController = new AuthController(authService);

const API: string = '/api';

export const routes = (server: express.Application) => {
  const router = express.Router();
  router.use('/users', userController.router);
  router.use('/roles', roleController.router);
  router.use('/auth', authController.router);
  //router.use('/permissions', permissionController.router);

  server.use(API, router);
};