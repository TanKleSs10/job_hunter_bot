import inquirer from "inquirer";
import { GetAllProfilesUsecase } from "../../../domain/useCases/profile/getAllProfiles.usecase";
import { ProfileRepository } from "../../../domain/repositories/profile.repository";

export async function profileSelectPrompt(repository: ProfileRepository) {
  try {
    const profiles = await new GetAllProfilesUsecase(repository).execute();

    const choices = [
      { name: "Crear uno nuevo", value: "__create__" },
      new inquirer.Separator(),
      ...profiles?.map((profile) => ({
        name: profile.name,
        value: profile.id,
      })),
    ];

    const { selectedProfileId } = await inquirer.prompt([
      {
        type: "list",
        name: "selectedProfileId",
        message: "Selecciona un perfil:",
        choices,
      },
    ]);

    return selectedProfileId;
  } catch (error) {
    console.error("There was an error", error);
    return false;
  }
}
