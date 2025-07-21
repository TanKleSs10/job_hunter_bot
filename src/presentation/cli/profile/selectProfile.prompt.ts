import inquirer from "inquirer";
import { GetAllProfilesUsecase } from "../../../domain/useCases/profile/getAllProfiles.usecase";
import { ProfileRepository } from "../../../domain/repositories/profile.repository";
import { ProfileService } from "../../../core/services/profile.service";

export async function profileSelectPrompt(
  repository: ProfileRepository,
  service: ProfileService,
  includeCreateOpt = true,
) {
  try {
    // validamos si los perfiles están cacheados en memoria
    if (service.getProfiles().length <= 0) {
      service.setProfiles(
        await new GetAllProfilesUsecase(repository).execute(),
      );
    }

    //obtenemos los perfiles desde el service
    const profiles = service.getProfiles();

    const baseChoices = profiles.map((profile) => ({
      name: profile.name,
      value: profile.id,
    }));

    const choices = includeCreateOpt
      ? [
          { name: "Crear uno nuevo", value: "__create__" },
          new inquirer.Separator(),
          ...baseChoices,
        ]
      : baseChoices;

    const { selectedProfileId } = await inquirer.prompt([
      {
        type: "list",
        name: "selectedProfileId",
        message: "Selecciona un perfil:",
        choices,
      },
    ]);

    if (selectedProfileId === "__create__") {
      return selectedProfileId;
    }

    service.setSelectedProfile(selectedProfileId);

    return true;
  } catch (error) {
    console.error("There was an error", error);
    return false;
  }
}
