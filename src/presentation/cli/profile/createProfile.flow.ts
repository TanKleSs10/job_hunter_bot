import { ProfileService } from "../../../core/services/profile.service";
import { CreateProfileSchema } from "../../../domain/dtos/schemas/profile";
import { ProfileRepository } from "../../../domain/repositories/profile.repository";
import { CreateProfileUseCase } from "../../../domain/useCases/profile/createProfile.usecase";
import { getDataProfilePrompt } from "./getDataProfile.prompt";

export async function createProfileFlow(
  repository: ProfileRepository,
  service: ProfileService,
) {
  try {
    const data = await getDataProfilePrompt();
    const result = CreateProfileSchema.safeParse(data);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        console.error(`Campo "${issue.path.join(".")}" -> ${issue.message}`);
      });
      return false;
    }

    const newProfile = await new CreateProfileUseCase(repository).execute(
      result.data,
    );

    if (!newProfile) {
      console.error("no se pudo crear el Perfil");
      return false;
    }

    service.clearProfiles();
    return true;
  } catch (error) {
    console.error("hubo un error", error);
    return false;
  }
}
