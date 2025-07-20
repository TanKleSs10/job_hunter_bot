import { ProfileDatasource } from "../../domain/datasources/profile.datasource";
import {
  CreateProfileDto,
  UpdateProfileDto,
} from "../../domain/dtos/schemas/profile";
import { ProfileEntity } from "../../domain/entities/profile.entity";
import { prisma } from "../db/prisma";

export class profileDatasourceImpl implements ProfileDatasource {
  async createProfile(
    createProfileDto: CreateProfileDto,
  ): Promise<ProfileEntity> {
    const newProfile = await prisma.profile.create({ data: createProfileDto });
    return ProfileEntity.fromObj(newProfile);
  }

  async updateProfile(updateProfile: UpdateProfileDto): Promise<ProfileEntity> {
    throw new Error("no implements");
  }

  async getAllProfiles(): Promise<ProfileEntity[]> {
    const allProfiles = await prisma.profile.findMany();
    return allProfiles.map((profile) => ProfileEntity.fromObj(profile));
  }
}
