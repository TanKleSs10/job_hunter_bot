import { CreateProfileDto, UpdateProfileDto } from "../dtos/schemas/profile";
import { ProfileEntity } from "../entities/profile.entity";

export abstract class ProfileDatasource {
  abstract createProfile(
    createProfileDto: CreateProfileDto,
  ): Promise<ProfileEntity>;

  abstract updateProfile(
    updateProfileDto: UpdateProfileDto,
  ): Promise<ProfileEntity>;

  abstract getAllProfiles(): Promise<ProfileEntity[]>;
}
