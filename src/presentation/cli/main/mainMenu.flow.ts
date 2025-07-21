import { ProfileService } from "../../../core/services/profile.service";
import { ProfileRepository } from "../../../domain/repositories/profile.repository";
import {
  deleteProfileFlow,
  profileSelectPrompt,
  updateProfileFlow,
} from "../profile";
import { createProfileFlow } from "../profile/createProfile.flow";
import { mainMenuPrompt } from "./mainMenu.prompt";

export async function mainMenuFlow(
  profileRepository: ProfileRepository,
  profileService: ProfileService,
) {
  const answer = await mainMenuPrompt();

  switch (answer) {
    case "use": {
      const ok = await profileSelectPrompt(profileRepository, profileService);
      if (!ok) console.log("Error al seleccionar perfil");
      break;
    }

    case "create": {
      const ok = await createProfileFlow(profileRepository, profileService);
      console.log(ok ? "Perfil creado" : "Error al crear perfil");
      break;
    }

    case "update": {
      const ok = await updateProfileFlow(profileRepository, profileService);
      console.log(ok ? "Perfil actualizado" : "Error al actualizar perfil");
      break;
    }

    case "delete": {
      const ok = await deleteProfileFlow(profileRepository, profileService);
      console.log(ok ? "Perfil eliminado" : "Error al eliminar perfil");
      break;
    }

    default:
      console.log("Opción no válida");
      break;
  }
}
