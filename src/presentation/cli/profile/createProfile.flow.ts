import { CreateProfileSchema } from "../../../domain/dtos/schemas/profile";
import { ProfileRepository } from "../../../domain/repositories/profile.repository";
import { CreateProfileUseCase } from "../../../domain/useCases/profile/createProfile.usecase";
import { createProfilePrompt } from "./createProfile.prompt";

export async function createProfileFlow(repository: ProfileRepository) {
  try {
    const data = await createProfilePrompt();
    const result = CreateProfileSchema.safeParse(data);

    if (!result.success) {
      result.error.issues.map((issue) => console.log(issue));
      return false;
    }

    const newProfile = await new CreateProfileUseCase(repository).execute(
      result.data,
    );

    if (!newProfile) {
      console.error("no se pudo crear el Perfil");
      return false;
    }

    console.log("Perfil creado con éxito");
    return true;
  } catch (error) {
    console.error("hubo un error", error);
    return false;
  }
}
