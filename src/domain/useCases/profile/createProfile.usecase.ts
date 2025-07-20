import { CreateProfileDto } from "../../dtos/schemas/profile";
import { ProfileEntity } from "../../entities/profile.entity";
import { ProfileRepository } from "../../repositories/profile.repository";

export interface ICreateProfile {
  execute(createProfileDto: CreateProfileDto): Promise<ProfileEntity>;
}

export class CreateProfileUseCase implements ICreateProfile {
  constructor(private readonly profileRepository: ProfileRepository) {}

  execute(createProfileDto: CreateProfileDto): Promise<ProfileEntity> {
    return this.profileRepository.createProfile(createProfileDto);
  }
}
