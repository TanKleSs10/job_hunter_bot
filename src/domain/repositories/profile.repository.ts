import { CreateProfileDto, UpdateProfileDto } from "../dtos/schemas/profile";
import { ProfileEntity } from "../entities/profile.entity";

export abstract class ProfileRepository {
  abstract createProfile(
    createProfile: CreateProfileDto,
  ): Promise<ProfileEntity>;

  abstract updateProfile(
    updateProfile: UpdateProfileDto,
  ): Promise<ProfileEntity>;

  abstract getAllProfiles(): Promise<ProfileEntity[]>;
}
