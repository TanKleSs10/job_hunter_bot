import { ProfileEntity } from "../../entities/profile.entity";
import { ProfileRepository } from "../../repositories/profile.repository";

export interface IGetAllProfiles {
  execute(): Promise<ProfileEntity[]>;
}

export class GetAllProfilesUsecase implements IGetAllProfiles {
  constructor(private readonly profileRepository: ProfileRepository) {}

  execute(): Promise<ProfileEntity[]> {
    return this.profileRepository.getAllProfiles();
  }
}
