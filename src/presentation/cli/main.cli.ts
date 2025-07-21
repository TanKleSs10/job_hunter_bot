import { ProfileService } from "../../core/services/profile.service";
import { profileDatasourceImpl } from "../../infrastructure/datasources/profile.datasource.impl";
import { ProfileRepositoryImpl } from "../../infrastructure/repositories/profile.repository.impl";
import { mainMenuFlow } from "./main/mainMenu.flow";

export async function runCliApp() {
  const profileDatasource = new profileDatasourceImpl();
  const profileRepository = new ProfileRepositoryImpl(profileDatasource);
  const profileService = new ProfileService();

  await mainMenuFlow(profileRepository, profileService);
}
