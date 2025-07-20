import { ProfileRepository } from "../../../domain/repositories/profile.repository";
import { profileSelectPrompt } from "../profile";
import { createProfileFlow } from "../profile/createProfile.flow";
import { mainMenuPrompt } from "./mainMenu.prompt";

export async function mainMenuFlow(profileRepository: ProfileRepository) {
  const answer = await mainMenuPrompt();

  switch (answer) {
    case "create":
      await createProfileFlow(profileRepository);
      break;

    case "use":
      const use = await profileSelectPrompt(profileRepository);
      console.log(use);
      break;

    default:
      console.log("opcion no valida");
      break;
  }
}
