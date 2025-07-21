import { ProfileDatasource } from "../../domain/datasources/profile.datasource";
import {
  CreateProfileDto,
  UpdateProfileDto,
} from "../../domain/dtos/schemas/profile";
import { ProfileEntity } from "../../domain/entities/profile.entity";
import { ProfileRepository } from "../../domain/repositories/profile.repository";

export class ProfileRepositoryImpl implements ProfileRepository {
  constructor(private readonly profileDatasource: ProfileDatasource) {}

  createProfile(createProfileDto: CreateProfileDto): Promise<ProfileEntity> {
    return this.profileDatasource.createProfile(createProfileDto);
  }

  updateProfile(updateProfileDto: UpdateProfileDto): Promise<ProfileEntity> {
    return this.profileDatasource.updateProfile(updateProfileDto);
  }

  getAllProfiles(): Promise<ProfileEntity[]> {
    return this.profileDatasource.getAllProfiles();
  }

  deleteProfile(profileId: string): Promise<ProfileEntity> {
    return this.profileDatasource.deleteProfile(profileId);
  }
}
