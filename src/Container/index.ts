// import inversify container
import {Container} from 'inversify';
import {ILoggerService} from '../Utils/Interfaces/LoggeService/ILoggerService';
import {ConsoleLoggerService} from '../App/Services/LoggerService/ConsoleLoggerService';
import {TYPES} from '../App/Interfaces/Types';
import {UserValidator} from "../Middleware/Validators/UserValidator";
import {BaseValidator} from "../Middleware/Validators/BaseValidator";
import {DataTypes} from "../Data/Interfaces/Types/DataTypes";
import {IDatabaseService} from "../Data/Interfaces/IDatabaseService";
import {MongooseDatabaseService} from "../Data/MongooseDatabaseService";
import {IUserRepository} from "../Data/Interfaces/Repositories/IUserRepository";
import {MongooseUserRepository} from "../Data/MongooseDatabaseService/Repository/MongooseUserRepository";
import {UtilsTypes} from "../Utils/Interfaces/Types/UtilsTypes";
import {IIDService} from "../App/Interfaces/IDService/IIDService";
import {UUIDService} from "../App/Services/IDService/UUIDService";
import {Auth} from "../App/Auth";
import {ITokenService} from "../App/Interfaces/TokenService/ITokenService";
import {JsonwebtokenTokenService} from "../App/Services/TokenService/JsonwebtokenTokenService";
import {IPasswordService} from "../App/Interfaces/PasswordService/IPasswordService";
import {BcryptPasswordService} from "../App/Services/PasswordService/BcryptPasswordService";
import {IUploaderService} from "../App/Interfaces/UploaderService/IUploaderService";
import {MulterUploaderService} from "../App/Services/UpladerService/MulterUploaderService";
import {BannerValidator} from "../Middleware/Validators/BannerValidator";
import {IBannerRepository} from "../Data/Interfaces/Repositories/IBannerRepository";
import {MongooseBannerRepository} from "../Data/MongooseDatabaseService/Repository/MongooseBannerRepository";
import {Banner} from "../App/Banner";
import {IGameRepository} from "../Data/Interfaces/Repositories/IGameRepository";
import {MongooseGameRepository} from "../Data/MongooseDatabaseService/Repository/MongooseGameRepository";


// create new container default in singleton mode
let container = new Container({defaultScope: 'Singleton'});

// bind utils layer
container.bind<ILoggerService>(UtilsTypes.ILoggerService).to(ConsoleLoggerService);


// bind app services
container.bind<IIDService>(TYPES.IIDService).to(UUIDService);
container.bind<ITokenService>(TYPES.ITokenService).to(JsonwebtokenTokenService);
container.bind<IPasswordService>(TYPES.IPasswordService).to(BcryptPasswordService);
container.bind<IUploaderService>(TYPES.IUploadService).to(MulterUploaderService);

//bind app implementations
container.bind<Auth>(Auth).to(Auth);
container.bind<Banner>(Banner).to(Banner);

// bind repositories
container.bind<IDatabaseService>(DataTypes.IDatabaseService).to(MongooseDatabaseService);
container.bind<IUserRepository>(DataTypes.IUserRepository).to(MongooseUserRepository);
container.bind<IBannerRepository>(DataTypes.IBannerRepository).to(MongooseBannerRepository)
container.bind<IGameRepository>(DataTypes.IGameRepository).to(MongooseGameRepository);


// bind validator to container
container.bind<BaseValidator>(BaseValidator).to(BaseValidator);
container.bind<UserValidator>(UserValidator).to(UserValidator);
container.bind<BannerValidator>(BannerValidator).to(BannerValidator);

export {container};