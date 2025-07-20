import { ProfileDatasource } from "../../domain/datasources/profile.datasource";
import {
  CreateProfileDto,
  UpdateProfileDto,
} from "../../domain/dtos/schemas/profile";
import { ProfileEntity } from "../../domain/entities/profile.entity";
import { ProfileRepository } from "../../domain/repositories/profile.repository";

export class ProfileRepositoryImpl implements ProfileRepository {
  constructor(private readonly profileDatasource: ProfileDatasource) {}

  createProfile(createProfile: CreateProfileDto): Promise<ProfileEntity> {
    return this.profileDatasource.createProfile(createProfile);
  }

  updateProfile(updateProfile: UpdateProfileDto): Promise<ProfileEntity> {
    throw new Error("no implement");
  }

  getAllProfiles(): Promise<ProfileEntity[]> {
    return this.profileDatasource.getAllProfiles();
  }
}
